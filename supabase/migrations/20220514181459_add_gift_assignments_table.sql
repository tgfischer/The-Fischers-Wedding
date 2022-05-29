-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public."giftAssignments"
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "guestId" bigint NOT NULL,
    "giftId" bigint NOT NULL,
    CONSTRAINT "giftAssignments_pkey" PRIMARY KEY (id),
    CONSTRAINT "giftAssignments_giftId_fkey" FOREIGN KEY ("giftId")
        REFERENCES public.gifts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "giftAssignments_guestId_fkey" FOREIGN KEY ("guestId")
        REFERENCES public.guests (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."giftAssignments"
    OWNER to postgres;

ALTER TABLE IF EXISTS public."giftAssignments"
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public."giftAssignments" TO anon;

GRANT ALL ON TABLE public."giftAssignments" TO authenticated;

GRANT ALL ON TABLE public."giftAssignments" TO postgres;

GRANT ALL ON TABLE public."giftAssignments" TO service_role;

ALTER TABLE IF EXISTS public.gifts DROP COLUMN IF EXISTS "createdAt";

ALTER TABLE IF EXISTS public.gifts DROP COLUMN IF EXISTS "updatedAt";

ALTER TABLE IF EXISTS public.gifts DROP COLUMN IF EXISTS "guestId";
ALTER TABLE IF EXISTS public.gifts DROP CONSTRAINT IF EXISTS "gifts_guestId_fkey";