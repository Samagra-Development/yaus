CREATE TABLE public.link (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "user" uuid,
    tags text[],
    clicks integer DEFAULT 0 NOT NULL,
    url text,
    hashid integer NOT NULL,
    project uuid,
    "customHashId" text
);
CREATE SEQUENCE public.link_hashid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.link_hashid_seq OWNED BY public.link.hashid;
CREATE TABLE public.template (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    text text,
    name name NOT NULL
);
ALTER TABLE ONLY public.link ALTER COLUMN hashid SET DEFAULT nextval('public.link_hashid_seq'::regclass);
ALTER TABLE ONLY public.link
    ADD CONSTRAINT "link_customHashId_key" UNIQUE ("customHashId");
ALTER TABLE ONLY public.link
    ADD CONSTRAINT link_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.link
    ADD CONSTRAINT link_user_project_url_key UNIQUE ("user", project, url);
ALTER TABLE ONLY public.template
    ADD CONSTRAINT template_pkey PRIMARY KEY (id);
