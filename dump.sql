--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0 (Debian 13.0-1.pgdg100+1)
-- Dumped by pg_dump version 13.0 (Debian 13.0-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    id bigint NOT NULL,
    name character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    energy double precision,
    fat double precision,
    carbohydrates double precision,
    fiber double precision,
    protein double precision,
    type character varying(255)
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_id_seq OWNER TO postgres;

--
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;


--
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_ingredients (
    id bigint NOT NULL,
    amount double precision,
    recipe_id bigint,
    ingredient_id bigint,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.recipe_ingredients OWNER TO postgres;

--
-- Name: recipe_ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_ingredients_id_seq OWNER TO postgres;

--
-- Name: recipe_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_ingredients_id_seq OWNED BY public.recipe_ingredients.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id bigint NOT NULL,
    name character varying(255),
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE public.schema_migrations OWNER TO postgres;

--
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


--
-- Name: recipe_ingredients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients ALTER COLUMN id SET DEFAULT nextval('public.recipe_ingredients_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (id, name, inserted_at, updated_at, energy, fat, carbohydrates, fiber, protein, type) FROM stdin;
2	Brootmääl	2020-11-21 15:59:53	2020-11-21 15:59:53	1450	1.6	68	3.5	12	flour
5	Roggämääl (Vollchorn)	2020-11-21 16:02:49	2020-11-21 16:02:49	1450	1.9	60	16	7.7	flour
6	Dinkelmääl (Vollchorn)	2020-11-21 16:03:44	2020-11-21 16:03:44	1450	3	59	9.5	14	flour
8	Weizäkleiä	2020-11-21 16:04:57	2020-11-21 16:04:57	1200	6	23	40	16	flour
10	Roggämääl (Grob, Vollchorn)	2020-11-21 16:06:34	2020-11-21 16:06:34	1450	60	1.9	16	7.7	flour
9	Wasser	2020-11-21 16:05:04	2020-11-21 16:05:04	0	0	0	0	0	water
11	Salz	2020-11-21 16:06:52	2020-11-21 16:06:52	0	0	0	0	0	spice
7	Starter	2020-11-21 16:04:22	2020-11-21 16:04:22	1416	0.8	67	6.9	9.2	starter
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_ingredients (id, amount, recipe_id, ingredient_id, inserted_at, updated_at) FROM stdin;
1	120	1	2	2020-11-21 16:07:33	2020-11-21 16:07:33
2	80	1	5	2020-11-21 16:07:53	2020-11-21 16:07:53
3	60	1	10	2020-11-21 16:08:07	2020-11-21 16:08:07
5	40	1	8	2020-11-21 16:08:42	2020-11-21 16:08:42
4	60	1	6	2020-11-21 16:08:21	2020-11-21 16:08:47
6	80	1	7	2020-11-21 16:09:09	2020-11-21 16:09:09
7	8	1	11	2020-11-21 16:09:30	2020-11-21 16:09:30
8	296	1	9	2020-11-21 16:10:01	2020-11-21 16:10:01
12	60	2	6	2020-11-21 16:11:19	2020-11-21 16:11:19
13	40	2	8	2020-11-21 16:11:19	2020-11-21 16:11:19
14	80	2	7	2020-11-21 16:11:19	2020-11-21 16:11:19
15	8	2	11	2020-11-21 16:11:19	2020-11-21 16:11:19
16	296	2	9	2020-11-21 16:11:19	2020-11-21 16:11:19
11	20	2	10	2020-11-21 16:11:19	2020-11-21 16:13:00
10	40	2	5	2020-11-21 16:11:19	2020-11-21 16:13:09
9	200	2	2	2020-11-21 16:11:19	2020-11-21 16:13:29
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, name, inserted_at, updated_at) FROM stdin;
1	V36	2020-11-21 16:07:16	2020-11-21 16:07:16
2	V37	2020-11-21 16:11:19	2020-11-21 16:11:30
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schema_migrations (version, inserted_at) FROM stdin;
20201022195309	2020-11-21 15:53:04
20201022202331	2020-11-21 15:53:04
20201024210805	2020-11-21 15:53:04
20201104185708	2020-11-21 15:53:04
20201107204940	2020-11-21 15:53:04
\.


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 11, true);


--
-- Name: recipe_ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_ingredients_id_seq', 16, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 2, true);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: recipe_ingredients recipe_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: recipe_ingredients_ingredient_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX recipe_ingredients_ingredient_id_index ON public.recipe_ingredients USING btree (ingredient_id);


--
-- Name: recipe_ingredients_recipe_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX recipe_ingredients_recipe_id_index ON public.recipe_ingredients USING btree (recipe_id);


--
-- Name: recipe_ingredients recipe_ingredients_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id);


--
-- Name: recipe_ingredients recipe_ingredients_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

