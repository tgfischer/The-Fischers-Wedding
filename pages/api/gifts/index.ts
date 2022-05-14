import {
  apiPipeline,
  authenticate,
  EndpointPipelineHandler
} from "../../../src/middleware";
import { AddGiftBody, EmptyResponse, GiftDto } from "../../../src/types";

export const getGiftsHandler: EndpointPipelineHandler<GiftDto[]> = async ({
  res,
  supabase
}) => {
  // TODO: Order the response by the guests foreign key
  const {
    data: gifts,
    error,
    status
  } = await supabase
    .from<GiftDto>("gifts")
    .select("id, description, guests(id, firstName, lastName)");

  if (error) {
    return {
      status,
      error: `${error.message} (${error.hint})`
    };
  }

  res.status(200).json(gifts);
  return { status: 200 };
};

export const addGiftHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const { description, guests }: AddGiftBody = req.body;

  const insertGiftRequest = await supabase.from("gifts").insert({
    description
  });

  if (insertGiftRequest.error) {
    return {
      status: insertGiftRequest.status,
      error: `${insertGiftRequest.error.message} (${insertGiftRequest.error.hint})`
    };
  }

  const insertGiftAssignmentsRequest = await supabase
    .from("giftAssignments")
    .insert(
      guests.map((guestId) => ({
        giftId: insertGiftRequest.data?.[0].id,
        guestId
      }))
    );

  if (insertGiftAssignmentsRequest.error) {
    return {
      status: insertGiftAssignmentsRequest.status,
      error: `${insertGiftAssignmentsRequest.error.message} (${insertGiftAssignmentsRequest.error.hint})`
    };
  }

  res.status(201).json({});
  return { status: 201 };
};

const handler = apiPipeline({
  GET: [authenticate, getGiftsHandler],
  POST: [authenticate, addGiftHandler]
});

export default handler;
