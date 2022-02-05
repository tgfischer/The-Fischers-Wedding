-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.reservations
(
    id text COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default",
    guests jsonb[] NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
    invitations text[] COLLATE pg_catalog."default" NOT NULL DEFAULT '{}'::text[],
    CONSTRAINT reservations_v2_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reservations
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.reservations
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.reservations TO anon;

GRANT ALL ON TABLE public.reservations TO authenticated;

GRANT ALL ON TABLE public.reservations TO postgres;

GRANT ALL ON TABLE public.reservations TO service_role;

GRANT ALL ON TABLE public.reservations TO supabase_admin;

COMMENT ON TABLE public.reservations
    IS 'A list of reservations for the wedding';

CREATE TABLE IF NOT EXISTS public.reservations_v1
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    address text COLLATE pg_catalog."default",
    CONSTRAINT reservations_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reservations_v1
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.reservations_v1
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.reservations_v1 TO anon;

GRANT ALL ON TABLE public.reservations_v1 TO authenticated;

GRANT ALL ON TABLE public.reservations_v1 TO postgres;

GRANT ALL ON TABLE public.reservations_v1 TO service_role;

GRANT ALL ON TABLE public.reservations_v1 TO supabase_admin;

COMMENT ON TABLE public.reservations_v1
    IS 'The reservations for the guests invited to the wedding';

CREATE TABLE IF NOT EXISTS public.guests_v1
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    "firstName" text COLLATE pg_catalog."default" NOT NULL,
    "lastName" text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "reservationId" text COLLATE pg_catalog."default" NOT NULL,
    meal text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default" NOT NULL DEFAULT 'pending'::text,
    song text COLLATE pg_catalog."default",
    CONSTRAINT guests_pkey PRIMARY KEY (id),
    CONSTRAINT "guests_reservationId_fkey" FOREIGN KEY ("reservationId")
        REFERENCES public.reservations_v1 (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.guests_v1
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.guests_v1
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.guests_v1 TO anon;

GRANT ALL ON TABLE public.guests_v1 TO authenticated;

GRANT ALL ON TABLE public.guests_v1 TO postgres;

GRANT ALL ON TABLE public.guests_v1 TO service_role;

GRANT ALL ON TABLE public.guests_v1 TO supabase_admin;

COMMENT ON TABLE public.guests_v1
    IS 'A list of guests invited to the wedding';
