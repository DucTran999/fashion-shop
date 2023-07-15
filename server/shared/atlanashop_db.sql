--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_variant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_variant (
    cart_id bigint NOT NULL,
    variant_id bigint NOT NULL,
    qty integer NOT NULL,
    date_placed timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: colors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.colors (
    id bigint NOT NULL,
    value character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: colors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.colors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.colors_id_seq OWNED BY public.colors.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id bigint NOT NULL,
    state_id bigint NOT NULL,
    items json NOT NULL,
    total_price bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    payment_method_id integer NOT NULL
);


--
-- Name: payment_methods; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_methods (
    id integer NOT NULL,
    value character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: payment_method_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_method_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_method_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_method_id_seq OWNED BY public.payment_methods.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    category_id integer NOT NULL,
    name text NOT NULL,
    code character varying(50) NOT NULL,
    description text NOT NULL,
    sold integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sizes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sizes (
    id bigint NOT NULL,
    value character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sizes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sizes_id_seq OWNED BY public.sizes.id;


--
-- Name: states; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.states (
    id bigint NOT NULL,
    value character varying(55) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.states_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    gender character varying(7) DEFAULT 'Other'::character varying NOT NULL,
    date_of_birth date,
    phone character varying(50) DEFAULT ''::character varying NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_disabled boolean DEFAULT false NOT NULL,
    address character varying(255) DEFAULT ''::character varying NOT NULL
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: variants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.variants (
    id bigint NOT NULL,
    product_id integer NOT NULL,
    color_id integer NOT NULL,
    size_id integer NOT NULL,
    sku character varying(50) NOT NULL,
    image text NOT NULL,
    images text[] NOT NULL,
    price integer NOT NULL,
    in_stock integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: variants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.variants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.variants_id_seq OWNED BY public.variants.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: colors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors ALTER COLUMN id SET DEFAULT nextval('public.colors_id_seq'::regclass);


--
-- Name: payment_methods id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_methods ALTER COLUMN id SET DEFAULT nextval('public.payment_method_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sizes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes ALTER COLUMN id SET DEFAULT nextval('public.sizes_id_seq'::regclass);


--
-- Name: states id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: variants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.variants ALTER COLUMN id SET DEFAULT nextval('public.variants_id_seq'::regclass);


--
-- Data for Name: cart_variant; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_variant (cart_id, variant_id, qty, date_placed) FROM stdin;
42	433	0	2023-07-11 20:36:31.906443+07
42	430	0	2023-07-11 20:45:37.678972+07
42	427	0	2023-07-11 20:40:15.380481+07
42	1	0	2023-07-11 20:53:00.522017+07
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, created_at, updated_at, deleted_at) FROM stdin;
2	bikini	2023-05-28 12:21:52.309861+07	2023-05-31 20:14:15.115562+07	\N
3	croptop	2023-05-28 12:22:23.788899+07	2023-05-31 20:14:15.115562+07	\N
4	shorts	2023-05-28 12:23:04.069404+07	2023-05-31 20:14:15.115562+07	\N
5	skirt	2023-05-28 12:23:11.279284+07	2023-05-31 20:14:15.115562+07	\N
6	blazer	2023-05-28 12:23:17.539327+07	2023-05-31 20:14:15.115562+07	\N
7	blouse	2023-05-28 12:24:46.759434+07	2023-05-31 20:14:15.115562+07	\N
8	dress	2023-05-28 12:26:54.04893+07	2023-05-31 20:14:15.115562+07	\N
9	polo	2023-05-31 15:48:42.86553+07	2023-05-31 20:14:15.115562+07	\N
1	pants	2023-05-28 12:21:46.009753+07	2023-06-01 11:16:21.416696+07	\N
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.colors (id, value, created_at) FROM stdin;
2	black	2023-05-29 10:02:48.743294+07
3	blue	2023-05-30 15:12:55.45803+07
4	dark blue	2023-05-30 15:13:01.428184+07
1	dark black	2023-05-28 23:58:54.577703+07
5	brown	2023-05-31 23:06:47.242115+07
6	white	2023-05-31 23:17:54.500075+07
7	light green	2023-05-31 23:35:15.795112+07
8	light pink	2023-06-01 10:07:10.351272+07
9	green jade	2023-06-01 10:31:31.807815+07
10	pink lily	2023-06-01 10:37:01.374822+07
11	vanilla	2023-06-01 11:29:38.434487+07
12	light blue	2023-06-01 12:01:02.352603+07
13	dark green	2023-06-01 12:01:40.08193+07
14	wheat	2023-06-01 12:19:35.840111+07
15	dark red	2023-06-01 14:25:30.75821+07
16	yellow	2023-06-01 16:41:35.658348+07
17	pink	2023-06-01 17:04:20.985876+07
18	deep vanilla	2023-06-01 17:43:26.90802+07
19	light grey	2023-06-01 18:19:31.657949+07
20	violet	2023-06-01 18:42:07.027509+07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, user_id, state_id, items, total_price, created_at, updated_at, payment_method_id) FROM stdin;
\.


--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_methods (id, value, created_at) FROM stdin;
1	cash on delivery	2023-06-13 11:48:36.299302+07
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, category_id, name, code, description, sold, created_at, updated_at, deleted_at) FROM stdin;
69	7	áo kiểu tay dài phối lá cổ viền ren thắt nơ	blou590415	- Chất linen dệt từ sợi tự nhiên, có tính chất chịu nhiệt, thấm hút cao, thoáng mát phù hợp mùa hè - Phù hợp mặc đi chơi, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-25 00:42:42.377633+07	2023-06-25 00:42:42.377633+07	\N
1	6	áo blazer tay dài cơ bản cài 2 nút	blaz643515	- Áo khoác blazer form suông cơ bản - Chất vải kaki dày dặn đứng phom, dễ giặt ủi - Phù hợp mặc tất cả các dịp	1	2023-05-29 18:25:18.276936+07	2023-06-24 14:22:29.417997+07	\N
70	3	áo thun cotton ba lỗ croptop	crop761888	- Áo thun cotton ba lỗ croptop  - Chất thun co dãn bốn chiều ôm sát cơ thể, độ đần hồi tốt mang lại cảm giác thoải mái cho người mặc. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần hoặc đi làm.	1	2023-06-25 00:45:49.925646+07	2023-06-25 00:45:49.925646+07	\N
27	8	đầm ren hoa 3d form suông bẹt vai tay dài	dres902229	- Đầm ren mini 2 dây phối tay dài - Vải ren hình hoa nhí mỏng mềm - Phù hợp mặc đi các buổi tiệc, hẹn hò, sự kiện hoặc đi du lịch,...	1	2023-06-01 16:05:11.543959+07	2023-06-24 14:22:29.417997+07	\N
71	3	áo 2 dây linen form rộng phối bèo ngực	crop378813	- Áo kiểu 2 dây, 2 tầng bèo, ngực cột nơ - Chất linen dệt từ sợi tự nhiên, có tính chất chịu nhiệt, thấm hút cao, thoáng mát phù hợp mùa hè - Phù hợp mặc đi chơi, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-25 00:49:59.385509+07	2023-06-25 00:49:59.385509+07	\N
4	6	áo blazer nhún xắn tay cách điệu	blaz670654	- Chất liệu: Tuyết thun  - Mô tả chất liệu:Có độ co dãn nhẹ, dày dặn, bền màu.  - Áo khoác blazer trendy, tay lửng có nhún ở sườn tay.  - Form suông	1	2023-05-31 23:32:00.556792+07	2023-06-24 14:22:29.417997+07	\N
5	6	áo blazer tay ngắn phối túi giả	blaz611959	- Áo blazer cơ bản, có đệm vai, tay ngắn, túi giả - Chất kaki dày dặn, đứng phom - Phù hợp mặc tất cả các dịp	1	2023-06-01 10:38:56.373225+07	2023-06-24 14:22:29.417997+07	\N
6	6	áo cropped blazer tay dài cài nút	blaz945630	- Áo blazer dáng cropped tay dài cài nút cơ bản, có đệm vai  - Chất kaki dày dặn, đứng phom  - Phù hợp mặc tất cả các dịp	1	2023-06-01 10:39:22.663318+07	2023-06-24 14:22:29.417997+07	\N
7	1	quần ống suông lưng cao dây kéo sau	pant534097	- Chất liệu: Lụa dẻo  - Mẫu quần ống suông này hứa hẹn là item không thể thiếu cho các tín đồ thời trang. Thiết kế cơ bản nhưng mang hơi thở hiện đại, cực kỳ tôn dáng và sành điệu. Item này có thể đồng hành cùng nàng đến văn phòng hoặc mix cùng những mẫu áo thun, croptop cho ra set đồ đi chơi cực hút mắt.	1	2023-06-01 11:17:38.647375+07	2023-06-24 14:22:29.417997+07	\N
8	1	quần form baggy xếp 4 ly	pant975379	- Quần tây ống túm đơn giản công sở - Chất kate mềm mịn, dễ dàng là phẳng bằng bàn ủi hơi. - Phù hợp mặc đi làm hoặc dạo phố.	1	2023-06-01 11:25:48.186554+07	2023-06-24 14:22:29.417997+07	\N
9	1	quần tây ống suông cơ bản túi xéo	pant110209	- Quần tây ống suông form cơ bản, túi xéo trước - Vải kaki đứng form và dày dặn - Phù hợp mặc đi làm, cà phê, hay đi tiệc	1	2023-06-01 11:48:54.904181+07	2023-06-24 14:22:29.417997+07	\N
51	9	áo thun 4 chiều form basic tay ngắn	polo749935	- Thun cotton 4 chiều.  - Chất liệu co dãn, độ đàn hồi tốt, bề mặt vải mềm mịn, thoáng mát mang lại cảm giác thoải mái cho người mặc. - Phù hợp mặc đi chơi, dạo phố, đi cafe với bạn bè.	1	2023-06-01 18:24:43.883473+07	2023-06-24 14:22:29.417997+07	\N
10	1	quần dài ống rộng lưng thun	pant919936	- Quần dài ống rộng lưng thun - Chất liệu kaki thoáng mát, mỏng nhẹ, dễ chịu, chất rũ nhẹ, có độ bền cao - Phù hợp mặc hàng ngày.	1	2023-06-01 11:52:29.969666+07	2023-06-24 14:22:29.417997+07	\N
11	4	quần short 2 túi đính hoa	shor857918	- Quần shorts túi xéo đính hoa trang trí. - Chất linen bố mềm và tương đối đứng form. Thoáng mát và thoải mái. - Phù hợp mặc đi chơi, hẹn hò, hay đi tiệc.	1	2023-06-01 12:14:25.314309+07	2023-06-24 14:22:29.417997+07	\N
12	4	quần short ống rộng bèo sườn	shor714414	- Quần short ống rộng, phối bèo 2 bên sườn - Chất linen dệt từ sợi tự nhiên, tính chịu nhiệt, thấm hút cao, thoáng mát phù hợp mùa hè - Phù hợp mặc đi làm, đi chơi, hẹn hò, du lịch,...	1	2023-06-01 12:26:32.032867+07	2023-06-24 14:22:29.417997+07	\N
13	4	quần short cơ bản ben trước 2 túi	shor196424	- Quần short cơ bản - Chất kaki mỏng, vải đứng phom - Phù hợp mặc đi chơi,làm, cafe cuối tuần hoặc du lịch.	1	2023-06-01 14:13:21.975885+07	2023-06-24 14:22:29.417997+07	\N
14	4	quần short dằn li trước lưng liền viền ren 2 túi	shor811553	- Quần ngắn viền ren ở lai và lưng quần  - Chất vải tafta dày dặn, bề mặt bóng nhẵn - Phù hợp mặc đi chơi, đi làm, cafe cuối tuần hoặc du lịch.	1	2023-06-01 14:21:34.377151+07	2023-06-24 14:22:29.417997+07	\N
15	4	quần short 4 ly lưng thun sau	shor276930	- Quần short lưng cao, xếp li và túi bên hông sườn, có đĩa cho dây lưng và khóa bằng nút ở thân trước. - Bề mặt chất liệu vải sợi mềm, mịn, chất rũ nhẹ, có độ dày dặn và độ bền cao. - Phù hợp mặc các dịp đi làm, hẹn hò.	1	2023-06-01 14:38:25.459583+07	2023-06-24 14:22:29.417997+07	\N
16	5	váy mini xếp li lưng liền	skir604842	- Váy mini xếp li, lưng liền - Chất liệu ford chéo dày dặn, đứng form và chạm vào thì khá mềm mại. - Phù hợp mặc đi chơi, cà phê, dạo phố, đi du lịch,...	1	2023-06-01 14:50:26.156784+07	2023-06-24 14:22:29.417997+07	\N
17	5	váy bố mini rã hông	skir259029	- Chân váy mini rã xéo tùng bèo - Chất liệu bố gân đứng form, cứng cáp mềm mịn có độ bền cao và dày dặn. - Phù hợp mặc đi chơi, đi làm, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-01 14:55:32.653415+07	2023-06-24 14:22:29.417997+07	\N
18	5	váy midi xếp li phối hàng nút	skir582078	- Váy bất đối xứng, xếp ly một bên thân trước, hàng nút giả bọc vải trang trí, dây kéo sau - Chất kaki dày dặn đứng phom, dễ giặt ủi - Phù hợp mặc đi làm, dạo phố, cafe cuối tuần	1	2023-06-01 15:12:05.392363+07	2023-06-24 14:22:29.417997+07	\N
19	5	váy tweed mini form a phối viền ngọc trai	skir616726	- Chân váy A mini phối dây ngọc trai ở thân và lai váy. Đóng bằng kéo phía sau. - Chất tweed dày dặn đứng form nhưng vẫn có độ rũ nhẹ. - Phù hợp mặc đi tiệc, đi chơi, đi làm, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-01 15:15:41.208251+07	2023-06-24 14:22:29.417997+07	\N
21	5	váy mini denim lưng gập	skir879366	- Chân váy mini lưng thấp, gập lưng và xếp li. - Chất liệu denim dày dặn và mềm. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	1	2023-06-01 15:29:47.244168+07	2023-06-24 14:22:29.417997+07	\N
22	8	đầm mini sn form xòe cổ v ngược	dres931470	- Đầm mini form xòe, sát nách, cổ V ngược - Chất vải kaki dày dặn đứng phom, dễ giặt ủi - Phù hợp mặc đi làm, đi chơi hoặc đi tiệc,..	1	2023-06-01 15:43:02.301801+07	2023-06-24 14:22:29.417997+07	\N
25	8	đầm midi cúp ngực cut out eo cột dây	dres987089	- Đầm maxi phom A khoét lưng vai trần không tay, khoen kim loại trang trí ở ngực. - Vải chiffon dày, có độ rũ nhưng vẫn mỏng nhẹ. - Phù hợp các buổi dạo chơi hay đi du lịch.	1	2023-06-01 15:58:34.066265+07	2023-06-24 14:22:29.417997+07	\N
3	6	áo blazer croptop xẻ cổ tay	blaz669261	- Áo blazer kiểu crop cổ vest. Tay dài, xẻ tay. Đóng bằng móc phía trước. - Chất liệu poly dày dặn, ít nhăn và thoải mái khi mặc. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	1424	2023-05-31 23:31:01.747418+07	2023-06-24 14:22:29.417997+07	\N
24	8	đầm mini đắp chéo tay cánh tiên	dres667300	- Đầm mini đắp chéo, tay cánh tiên - Chất voan in hoa rũ, nhẹ, bồng bềnh mềm mại. Chất vải mát, thoáng' - Phù hợp mặc đi chơi, dạo phố, đi cafe với bạn bè.	1225	2023-06-01 15:52:34.494593+07	2023-06-24 14:22:29.417997+07	\N
20	5	váy skort cơ bản 2 túi	skir345539	- Váy quần cơ bản, có túi 2 bên - Vải kaki mịn, dày dặn, đứng form, có độ đàn hồi tốt và độ bền cao - Phù hợp mặc hàng ngày	2544	2023-06-01 15:21:30.607194+07	2023-06-24 14:22:29.417997+07	\N
23	8	đầm yếm nhún ngực nhung tăm	dres630735	- Đầm yếm form chữ A, nhún ngực.  - Chất liệu nhung tăm mềm mịn, chắc chắn và thoáng mát. - Phù hợp mặc đi chơi, dạo phố, cà phê cuối tuần.	7524	2023-06-01 15:46:09.53866+07	2023-06-24 14:22:29.417997+07	\N
28	8	đầm mini cúp ngực smocking tùng 2 tầng	dres636811	- Đầm ren mini 2 dây phối tay dài - Vải ren hình hoa nhí mỏng mềm - Phù hợp mặc đi các buổi tiệc, hẹn hò, sự kiện hoặc đi du lịch,...	1	2023-06-01 16:07:57.020189+07	2023-06-24 14:22:29.417997+07	\N
29	8	đầm midi tay phồng cổ tim dằn li	dres498744	- Đầm ren mini 2 dây phối tay dài - Vải ren hình hoa nhí mỏng mềm - Phù hợp mặc đi các buổi tiệc, hẹn hò, sự kiện hoặc đi du lịch,...	1	2023-06-01 16:11:24.888158+07	2023-06-24 14:22:29.417997+07	\N
32	9	áo thun polo basic	polo948102	- Áo thun polo basic - Chất thun mềm, mịn, thoáng mát và thoải mái - Phù hợp mặc vào tất cả các dịp	1	2023-06-01 16:28:38.927179+07	2023-06-24 14:22:29.417997+07	\N
33	9	áo polo thêu trái tim phối viền	polo341207	- Áo thun polo basic - Chất thun mềm, mịn, thoáng mát và thoải mái - Phù hợp mặc vào tất cả các dịp	1	2023-06-01 16:28:54.977637+07	2023-06-24 14:22:29.417997+07	\N
34	9	áo thun hoa cuốn biên	polo142967	- Áo thun tay ngắn ôm hoạ tiết hoa - Chất liệu thun cotton co dãn thấm hút tốt, mát mẻ cho người mặc - Phù hợp mặc đi làm, đi chơi, dạo phố, đi cafe với bạn bè	1	2023-06-01 16:29:37.377125+07	2023-06-24 14:22:29.417997+07	\N
35	3	áo thun gân croptop tay ngắn cuốn biên	crop295322	- Áo thun gân croptop tay ngắn cuốn biên - Chất thun co dãn, độ đàn hồi tốt, bề mặt vải mềm mịn, thoáng mát mang lại cảm giác thoải mái cho người mặc. - Phù hợp mặc đi chơi, dạo phố, đi cafe với bạn bè.	1	2023-06-01 16:52:14.461008+07	2023-06-24 14:22:29.417997+07	\N
36	3	áo thun gân croptop tay dài cổ v phối nút trước	crop712553	- Áo thun gân croptop tay dài cổ V phối nút trước - Chất liệu thun gân mềm, mịn, thoáng mát và thoải mái. - Phù hợp mặc đi chơi, đi làm, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-01 16:53:07.041009+07	2023-06-24 14:22:29.417997+07	\N
37	3	áo thun gân croptop tay lỡ cổ tròn cài nút trước	crop415334	- Áo thun croptop cổ tròn nút dọc thân - Chất liệu thun gân mềm, mịn, thoáng mát và thoải mái. - Phù hợp mặc đi chơi, đi làm, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-01 16:53:42.920583+07	2023-06-24 14:22:29.417997+07	\N
38	3	áo kiểu crop bẹt vai tay dài nhún thun	crop697804	- Áo crop top bẹt vai, tay phồng, lưng sau thun nhún smocking, dây kéo sắt, thân có lớp lót - Vải voan có độ ánh và xuyên thấu nhẹ - Phù hợp đi chơi, đi dạo	1	2023-06-01 16:56:40.768483+07	2023-06-24 14:22:29.417997+07	\N
39	3	áo thun crop top vai ngang nhún thun	crop411376	- Áo thun bẹt vai nhấn nơ trước ngực, form croptop. - Chất thun gân co dãn bốn chiều, mềm mịn rũ, không bị nhão chảy thun. - Phù hợp mặc đi làm hoặc đi chơi.	1	2023-06-01 17:16:06.965262+07	2023-06-24 14:22:29.417997+07	\N
40	3	áo kiểu crop tay dài cutout vai nhún eo	crop900039	- Áo croptop lệch vai, tay dài - Chất liệu thun kim tuyến có độ co giãn tốt, hiệu ứng kim tuyến lạ mắt - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần hoặc du lịch	1	2023-06-01 17:17:56.443146+07	2023-06-24 14:22:29.417997+07	\N
41	3	áo kiểu crop form rộng cổ vuông nhún thun tay phồng	crop876576	- Áo kiểu crop form rộng, cổ vuông, nhún thun, tay phồng - Chất Linen dệt từ sợi tự nhiên, tính chịu nhiệt, thấm hút cao, thoáng mát phù hợp mùa hè - Phù hợp mặc đi làm, đi chơi, hẹn hò, du lịch,...	1	2023-06-01 17:29:20.345043+07	2023-06-24 14:22:29.417997+07	\N
44	7	áo kiểu tay cánh tiên smocking phối bèo	blou391774	- Áo kiểu smocking thân, tay cánh tiên ngắn 2 lớp phối bèo, cổ vuông. - Chất liệu kate mềm mịn và mỏng nhẹ. Thoáng mát và thoải mái khi mặc. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần hoặc đi làm.	1	2023-06-01 17:49:58.604873+07	2023-06-24 14:22:29.417997+07	\N
45	7	áo kiểu cổ vuông tay phồng đính nút thân trước	blou982159	- Áo peplum, tay phồng, ngực nhún, hàng nút trang trí. - Vải Linen dệt từ sợi tự nhiên, có tính chịu nhiệt, thấm hút cao, thoáng mát phù hợp mùa hè. - Phù hợp mặc đi chơi, đi làm, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-01 17:53:34.343303+07	2023-06-24 14:22:29.417997+07	\N
47	7	áo kiểu form rộng tay phồng phối lá cổ vuông	blou464030	- Áo sơ mi form rộng, tay phồng lá cổ vuông phối bèo - Chất liệu voan tơ rũ, nhẹ, bồng bềnh mềm mại. Chất vải mát, thoáng, sang trọng - Phù hợp mặc vào tất cả các dịp	1	2023-06-01 17:59:14.863742+07	2023-06-24 14:22:29.417997+07	\N
48	9	áo thun oversize salt sea sand	polo664398	- Áo thun oversized in chữ Salt Sea Sand - Chất liệu thun 4 chiều co giãn, mềm mịn, thoáng mát và thoải mái. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	1	2023-06-01 18:06:30.867341+07	2023-06-24 14:22:29.417997+07	\N
49	9	áo thun oversize in summer is a state of mind	polo660719	- Áo thun oversize in nổi - Chất liệu thun 2 chiều co giãn, mềm mịn, thoáng mát và thoải mái - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	1	2023-06-01 18:09:17.994658+07	2023-06-24 14:22:29.417997+07	\N
50	9	áo thun gân form ôm tay ngắn	polo320962	- Chất liệu thun đũa  - Chất liệu mềm, mịn, co giãn, thoáng mát và thoải mái. - Phù hợp mặc vào tất cả các dịp.	1	2023-06-01 18:17:00.610422+07	2023-06-24 14:22:29.417997+07	\N
43	3	áo crop bẹt vai phối bèo smocking tay	crop422254	- Áo crop bẹt vai phối bèo smocking tay, dây kéo sắt sau lưng - Chất kaki bề mặt có độ bóng nhẹ, mỏng mát, dễ giặt ủi - Phù hợp mặc đi chơi, đi dạo	4785	2023-06-01 17:36:20.321296+07	2023-06-24 14:22:29.417997+07	\N
42	3	áo kiểu crop bẹt vai nhún thun eo	crop816791	- Áo bẹt vai tay dài nhún thun. - Chất liệu tằm mềm mịn, mỏng nhẹ, chất vải thoáng mát và thoải mái khi mặc. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	6224	2023-06-01 17:33:53.883011+07	2023-06-24 14:22:29.417997+07	\N
26	8	đầm ren mini 2 dây phối tay dài	dres221344	- Đầm ren mini 2 dây phối tay dài - Vải ren hình hoa nhí mỏng mềm - Phù hợp mặc đi các buổi tiệc, hẹn hò, sự kiện hoặc đi du lịch,...	5624	2023-06-01 16:02:44.055372+07	2023-06-24 14:22:29.417997+07	\N
30	8	đầm mini 2 dây cutout eo phối ren 2 tầng	dres166216	- Đầm ren mini 2 dây phối tay dài - Vải ren hình hoa nhí mỏng mềm - Phù hợp mặc đi các buổi tiệc, hẹn hò, sự kiện hoặc đi du lịch,...	5512	2023-06-01 16:18:22.26266+07	2023-06-24 14:22:29.417997+07	\N
31	8	đầm mini cổ tim rã ngực tay phồng	dres599551	- Đầm ren mini 2 dây phối tay dài - Vải ren hình hoa nhí mỏng mềm - Phù hợp mặc đi các buổi tiệc, hẹn hò, sự kiện hoặc đi du lịch,...	2344	2023-06-01 16:19:51.901924+07	2023-06-24 14:22:29.417997+07	\N
52	2	bikini 2 dây đính khoen ngực	biki358512	- Đồ bơi 2 mảnh, khoen kim loại trang trí ở ngực - Chất thun 4 chiều co dãn nhiều, độ đàn hồi tốt, bề mặt vải mềm mịn, thoáng mát mang lại cảm giác thoải mái cho người mặc. - Phù hợp mặc đi bơi, du lịch biển, tiệc hồ bơi.	1	2023-06-01 18:33:38.176138+07	2023-06-24 14:22:29.417997+07	\N
53	2	bikini tay dài cột nơ ngực	biki253874	- Đồ bơi 2 mảnh, cột nơ ở ngực. - Thun chuyên cho đồ bơi, co dãn tốt. - Dùng chuyên cho bơi lội.	1	2023-06-01 18:40:51.888584+07	2023-06-24 14:22:29.417997+07	\N
54	2	đồ bơi monokini hoạ tiết thắt nơ vai	biki870283	- Đồ bơi monokini hoạ tiết biển, sườn phối vải trơn, vai cột nơ - Chất thun 4 chiều co dãn nhiều, độ đàn hồi tốt, bề mặt vải mềm mịn, thoáng mát mang lại cảm giác thoải mái cho người mặc. - Phù hợp mặc đi bơi, du lịch biển, tiệc hồ bơi.	1	2023-06-01 18:44:58.86579+07	2023-06-24 14:22:29.417997+07	\N
55	2	đồ bơi cổ yếm dây kéo thân trước	biki687717	- Đồ bơi monokini hoạ tiết biển, sườn phối vải trơn, vai cột nơ - Chất thun 4 chiều co dãn nhiều, độ đàn hồi tốt, bề mặt vải mềm mịn, thoáng mát mang lại cảm giác thoải mái cho người mặc. - Phù hợp mặc đi bơi, du lịch biển, tiệc hồ bơi.	1	2023-06-01 18:47:04.146197+07	2023-06-24 14:22:29.417997+07	\N
56	2	bikini hoạ tiết biển	biki723250	- Bikini 2 mảnh hoạ tiết biển - Chất thun 4 chiều co dãn nhiều, độ đàn hồi tốt, bề mặt vải mềm mịn, thoáng mát mang lại cảm giác thoải mái cho người mặc. - Phù hợp mặc đi bơi, du lịch biển, tiệc hồ bơi.	1	2023-06-01 18:50:24.995236+07	2023-06-24 14:22:29.417997+07	\N
2	6	áo blazer form suông cơ bản	blaz419312	- Áo blazer form suông cơ bản - Chất liệu sợi tổng hợp mịn màng, đàn hồi tốt và có độ bền cao, dày dặn. - Phù hợp mặc đi làm, đi cà phê	2875	2023-05-29 20:08:37.569045+07	2023-06-24 14:22:29.417997+07	\N
46	7	áo kiểu babydoll đắp chéo tay phồng	blou598148	- Áo babydoll tay phồng, đắp chéo ngực - Chất liệu vải dập in họa tiết thoáng mát, có độ nhăn ít, bề mặt chất liệu mịn, chất dày dặn đứng form và độ bền cao. - Phù hợp mặc đi chơi, đi làm, dạo phố, cà phê cuối tuần cùng bạn bè.	4884	2023-06-01 17:55:53.224763+07	2023-06-24 14:22:29.417997+07	\N
57	8	đầm mini 2 dây form suông phối bèo ngực	dres795435	- Đầm voan dập họa tiết cổ yếm 2 dây, rã bèo dọc thân đầm - Chất liệu voan hoa dập họa tiết mỏng nhẹ, bồng bềnh mềm mại. thoáng mát, sang trọng - Phù hợp với mặc đi chơi, đi tiệc, đi sự kiện, dạo phố, cà phê cuối tuần cùng bạn bè.	1235	2023-06-01 18:52:09.95422+07	2023-06-24 14:22:29.417997+07	\N
58	9	áo thun oversize nature vibes	polo890934	- Áo thun oversize Nature vibes - Chất liệu thun 4 chiều co giãn, mềm mịn, thoáng mát và thoải mái. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	1	2023-06-23 20:05:39.639016+07	2023-06-24 14:22:29.417997+07	\N
59	9	áo thun oversize nice to meet you	polo316667	- Áo thun oversize in hình - Chất thun 2 chiều mỏng thoáng, ít co giãn, ít nhăn - Phù hợp mặc đi làm, đi chơi, dạo phố, cafe cuối tuần hoặc du lịch.	1	2023-06-23 20:09:43.740278+07	2023-06-24 14:22:29.417997+07	\N
60	8	đầm 2 dây form baby doll nhún bèo ngực	dres997856	- Treo với móc áo có khấc - Chất voan nhẹ, bồng bềnh, thoáng mát - Phù hợp mặc đi chơi, đi dạo	1	2023-06-23 20:37:12.641796+07	2023-06-24 14:22:29.417997+07	\N
61	9	áo thun in chữ grow positive thoughts	polo983506	- Áo thun in chữ Grow positive thoughts - Chất liệu thun 4 chiều co giãn, mềm mịn, thoáng mát và thoải mái. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	1	2023-06-23 20:44:08.832003+07	2023-06-24 14:22:29.417997+07	\N
62	9	áo thun in chữ be a warrior not a worrier	polo540987	- Áo thun in chữ Be a warrior not a worrier - Chất liệu thun 4 chiều co giãn, mềm mịn, thoáng mát và thoải mái. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần.	1	2023-06-23 20:50:16.189427+07	2023-06-24 14:22:29.417997+07	\N
63	8	đầm maxi 2 dây form suông hở lưng thắt nơ	dres813707	- Đầm maxi 2 dây form suông hở lưng thắt nơ, phối chi tiết bèo rút dây để tưa tự nhiên. - Chất linen mỏng mềm mịn, thoáng mát và rũ tự nhiên. - Phù hợp đi chơi, dạo phố, cafe cuối tuần hoặc đi du lịch.	1	2023-06-23 20:54:49.247962+07	2023-06-24 14:22:29.417997+07	\N
64	8	đầm 2 dây maxi form suông 2 túi	dres920160	- Đầm maxi hai dây cổ vuông có túi, đóng bằng dây kéo phía sau. - Chất liệu linen mềm mịn, thoáng mát và có độ rũ tương đối. - Phù hợp mặc đi chơi, dạo phố, cafe cuối tuần hoặc đi du lịch.	1	2023-06-23 20:58:34.167544+07	2023-06-24 14:22:29.417997+07	\N
72	5	váy mini bèo tầng đính hoa 1 bên	skir109221	- Váy mini 3 đính hoa eo, 3 tầng bèo xéo - Chất liệu chiffon rũ, nhẹ, bồng bềnh mềm mại. Chất vải mát, thoáng, sang trọng - Phù hợp mặc đi chơi, đi tiệc, đi sự kiện, dạo phố, cà phê cuối tuần cùng bạn bè.	1	2023-06-25 00:55:30.151954+07	2023-06-25 00:55:30.151954+07	\N
\.


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sizes (id, value, created_at, updated_at) FROM stdin;
1	small	2023-05-30 00:08:16.768287+07	2023-06-24 14:41:58.622967+07
2	medium	2023-05-30 00:08:26.22838+07	2023-05-31 14:32:55.964636+07
3	large	2023-05-30 00:08:29.408604+07	2023-05-31 23:20:43.255791+07
\.


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.states (id, value, created_at) FROM stdin;
1	processing	2023-06-13 00:19:52.993649+07
2	shipping	2023-06-13 00:20:11.306977+07
4	completed	2023-06-13 00:21:44.961042+07
5	cancelling	2023-06-14 18:15:14.405263+07
3	cancelled	2023-06-13 00:21:15.810295+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, first_name, last_name, email, password, gender, date_of_birth, phone, is_admin, created_at, update_at, is_disabled, address) FROM stdin;
42	admin	admin	admintest@gmail.com	$2b$08$TUTS1zhHF5ZA7H9FwxzR7uChQdJ8Z.X5JcJ9ed8zRWQz6caSY7r7K	Other	\N		t	2023-07-11 20:13:33.168555+07	2023-07-11 20:13:33.168555+07	f	
\.


--
-- Data for Name: variants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.variants (id, product_id, color_id, size_id, sku, image, images, price, in_stock, created_at, updated_at, deleted_at) FROM stdin;
460	69	10	1	blou590415slipik	pro_hong_1_328e21e0c18240bfb9ab9b02eb69268f.webp	{pro_hong_1_328e21e0c18240bfb9ab9b02eb69268f.webp,pro_hong_2_552dbb676e6044bb8b9ba3431758276b.webp,pro_hong_3_fedc6d22e62b42c0ab035590799cbfb2.webp,pro_hong_4_b4005c7d9435417981d8437a02485059.webp}	695000	72	2023-06-25 00:43:53.495649+07	2023-06-25 00:43:53.495649+07	\N
461	69	10	2	blou590415mlipik	pro_hong_1_328e21e0c18240bfb9ab9b02eb69268f.webp	{pro_hong_1_328e21e0c18240bfb9ab9b02eb69268f.webp,pro_hong_2_552dbb676e6044bb8b9ba3431758276b.webp,pro_hong_3_fedc6d22e62b42c0ab035590799cbfb2.webp,pro_hong_4_b4005c7d9435417981d8437a02485059.webp}	695000	66	2023-06-25 00:43:59.765008+07	2023-06-25 00:43:59.765008+07	\N
462	69	10	3	blou590415llipik	pro_hong_1_328e21e0c18240bfb9ab9b02eb69268f.webp	{pro_hong_1_328e21e0c18240bfb9ab9b02eb69268f.webp,pro_hong_2_552dbb676e6044bb8b9ba3431758276b.webp,pro_hong_3_fedc6d22e62b42c0ab035590799cbfb2.webp,pro_hong_4_b4005c7d9435417981d8437a02485059.webp}	695000	72	2023-06-25 00:44:05.004249+07	2023-06-25 00:44:05.004249+07	\N
2	2	4	2	blaz419312mdblu	pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp	{pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp,pro_lam_2_2475ab64808a4a7099b06999207a8d0a_large.webp,pro_lam_3_4801c0d382284ed1aac770af88eebffc_large.webp,pro_lam_4_b5c6f8cdf0034748a943acf0f639a32d_large.webp}	6950000	14	2023-05-31 01:05:33.030778+07	2023-06-24 14:47:43.897916+07	\N
463	70	10	1	crop761888slipik	pro_hong_1_d740a3ba179f4a7289ee637ac5ea7e70.webp	{pro_hong_1_d740a3ba179f4a7289ee637ac5ea7e70.webp,pro_hong_2_cb3ca5879a0e481383d88828ff3ecf15.webp,pro_hong_3_72f861af7ca34bc6a49bc6d7dc6504bb.webp,pro_hong_4_87d208839c9b436a8c53826988a8741d.webp}	350000	72	2023-06-25 00:47:36.145269+07	2023-06-25 00:47:36.145269+07	\N
464	70	10	2	crop761888mlipik	pro_hong_1_d740a3ba179f4a7289ee637ac5ea7e70.webp	{pro_hong_1_d740a3ba179f4a7289ee637ac5ea7e70.webp,pro_hong_2_cb3ca5879a0e481383d88828ff3ecf15.webp,pro_hong_3_72f861af7ca34bc6a49bc6d7dc6504bb.webp,pro_hong_4_87d208839c9b436a8c53826988a8741d.webp}	350000	72	2023-06-25 00:47:40.075041+07	2023-06-25 00:47:40.075041+07	\N
22	3	7	1	blaz669261slgre	pro_xanh_la_1_1b334116dffb482cbd487fae7733de93.webp	{pro_xanh_la_1_1b334116dffb482cbd487fae7733de93.webp,pro_xanh_la_2_7b493542c5fc4367bb54e64b58e77320.webp,pro_xanh_la_3_6f3898f03ffa467ab3a536509be39739.webp,pro_xanh_la_4_edc85d50a94b49b3b0ae06b1a067a364.webp}	495000	5	2023-05-31 23:39:00.893404+07	2023-06-24 14:47:43.897916+07	\N
465	70	3	1	crop761888sblue	pro_xanh_duong_1_7dc468061ed84806bf2decfad0f002d5.webp	{pro_xanh_duong_1_7dc468061ed84806bf2decfad0f002d5.webp,pro_xanh_duong_2_e7c761450d694b2ab2eb2dbf9b31a41c.webp,pro_xanh_duong_3_3ba448f2fcaa4c449da130ac9ca9e8b2.webp,pro_xanh_duong_4_7f2e5007799c422e867d8f478194cb69.webp}	350000	72	2023-06-25 00:48:32.545296+07	2023-06-25 00:48:32.545296+07	\N
466	70	3	2	crop761888mblue	pro_xanh_duong_1_7dc468061ed84806bf2decfad0f002d5.webp	{pro_xanh_duong_1_7dc468061ed84806bf2decfad0f002d5.webp,pro_xanh_duong_2_e7c761450d694b2ab2eb2dbf9b31a41c.webp,pro_xanh_duong_3_3ba448f2fcaa4c449da130ac9ca9e8b2.webp,pro_xanh_duong_4_7f2e5007799c422e867d8f478194cb69.webp}	350000	72	2023-06-25 00:48:41.224678+07	2023-06-25 00:48:41.224678+07	\N
467	70	3	3	crop761888lblue	pro_xanh_duong_1_7dc468061ed84806bf2decfad0f002d5.webp	{pro_xanh_duong_1_7dc468061ed84806bf2decfad0f002d5.webp,pro_xanh_duong_2_e7c761450d694b2ab2eb2dbf9b31a41c.webp,pro_xanh_duong_3_3ba448f2fcaa4c449da130ac9ca9e8b2.webp,pro_xanh_duong_4_7f2e5007799c422e867d8f478194cb69.webp}	350000	72	2023-06-25 00:48:45.824935+07	2023-06-25 00:48:45.824935+07	\N
468	71	3	3	crop378813lblue	pro_xanh_duong_1_b034de4627564908bec7480a6f462a03.webp	{pro_xanh_duong_1_b034de4627564908bec7480a6f462a03.webp,pro_xanh_duong_2_348e410cac6444a4b5ef917e407409f5.webp,pro_xanh_duong_3_fb1a25402ec34022aea7740fae3b98ac.webp,pro_xanh_duong_4_923952b65b9a447d8b45c83166130dfa.webp}	350000	72	2023-06-25 00:51:38.965729+07	2023-06-25 00:51:38.965729+07	\N
469	71	3	1	crop378813sblue	pro_xanh_duong_1_b034de4627564908bec7480a6f462a03.webp	{pro_xanh_duong_1_b034de4627564908bec7480a6f462a03.webp,pro_xanh_duong_2_348e410cac6444a4b5ef917e407409f5.webp,pro_xanh_duong_3_fb1a25402ec34022aea7740fae3b98ac.webp,pro_xanh_duong_4_923952b65b9a447d8b45c83166130dfa.webp}	350000	5	2023-06-25 00:51:46.25534+07	2023-06-25 00:51:46.25534+07	\N
470	71	3	2	crop378813mblue	pro_xanh_duong_1_b034de4627564908bec7480a6f462a03.webp	{pro_xanh_duong_1_b034de4627564908bec7480a6f462a03.webp,pro_xanh_duong_2_348e410cac6444a4b5ef917e407409f5.webp,pro_xanh_duong_3_fb1a25402ec34022aea7740fae3b98ac.webp,pro_xanh_duong_4_923952b65b9a447d8b45c83166130dfa.webp}	350000	5	2023-06-25 00:51:48.477005+07	2023-06-25 00:51:48.477005+07	\N
471	72	2	1	skir109221sblk	pro_den_1_4a5f092501214e84979397b600852ab0.webp	{pro_den_1_4a5f092501214e84979397b600852ab0.webp,pro_den_2_ad0fce9d9dd84fcab7757975b8c83b66.webp,pro_den_3_5c65463c8e454d99bf1f39a2445c584d.webp,pro_den_4_9b5e21306b084a118cefb84d3f451b40.webp}	350000	56	2023-06-25 00:56:50.591072+07	2023-06-25 00:56:50.591072+07	\N
133	16	2	1	skir604842sblk	pro_den_1_43ddb1fc51704d0e89fdc679fcc30c05.webp	{pro_den_1_43ddb1fc51704d0e89fdc679fcc30c05.webp,pro_den_2_6685af05031545dc83c84695024a8f45.webp,pro_den_3_f8a70108885f428096c5714bc106ddd4.webp,pro_den_4_c8d5040064064d4796361a2022b31866.webp}	355000	15	2023-06-01 14:52:24.464691+07	2023-06-24 14:47:43.897916+07	\N
250	31	15	1	dres599551sdred	pro_do_1_88bd0e2937d34303b9ee096d7e06cc9d.webp	{pro_do_1_88bd0e2937d34303b9ee096d7e06cc9d.webp,pro_do_2_13d16b20fbeb4ee19d2bab1135777e98.webp,pro_do_3_ac6d62b7de31409192825151d092890c.webp,pro_do_4_441f521d404c4ef391bbed65e48d9f47.webp}	995000	7	2023-06-01 16:24:55.089842+07	2023-06-24 14:47:43.897916+07	\N
313	41	6	1	crop876576swht	pro_trang_1_e3f13ae2e10f4f0ebe9292146d654251.webp	{pro_trang_1_e3f13ae2e10f4f0ebe9292146d654251.webp,pro_trang_2_afacaf9cf8f444bdb237a3228603d8be.webp,pro_trang_3_c80e5245d6574c76bd8e1af14425d38c.webp,pro_trang_4_e1bfd1595832416da15374df1afe3fda.webp}	455000	46	2023-06-01 17:26:30.515993+07	2023-06-24 14:47:43.897916+07	\N
314	41	6	2	crop876576mwht	pro_trang_1_e3f13ae2e10f4f0ebe9292146d654251.webp	{pro_trang_1_e3f13ae2e10f4f0ebe9292146d654251.webp,pro_trang_2_afacaf9cf8f444bdb237a3228603d8be.webp,pro_trang_3_c80e5245d6574c76bd8e1af14425d38c.webp,pro_trang_4_e1bfd1595832416da15374df1afe3fda.webp}	455000	46	2023-06-01 17:26:32.520674+07	2023-06-24 14:47:43.897916+07	\N
315	41	6	3	crop876576lwht	pro_trang_1_e3f13ae2e10f4f0ebe9292146d654251.webp	{pro_trang_1_e3f13ae2e10f4f0ebe9292146d654251.webp,pro_trang_2_afacaf9cf8f444bdb237a3228603d8be.webp,pro_trang_3_c80e5245d6574c76bd8e1af14425d38c.webp,pro_trang_4_e1bfd1595832416da15374df1afe3fda.webp}	455000	7	2023-06-01 17:26:35.805619+07	2023-06-24 14:47:43.897916+07	\N
316	41	2	1	crop876576sblk	pro_den_1_74e22efd409e4f5596a35658737c77eb.webp	{pro_den_1_74e22efd409e4f5596a35658737c77eb.webp,pro_den_2_d88182f67f6249478228d824203f5bb5.webp,pro_den_3_4d7bd40d79864fee89bb07efca0f76b0.webp,pro_den_4_a1d3581c3c0e49d7b7403c18ee80ccb8.webp}	455000	7	2023-06-01 17:27:00.535539+07	2023-06-24 14:47:43.897916+07	\N
317	41	2	2	crop876576mblk	pro_den_1_74e22efd409e4f5596a35658737c77eb.webp	{pro_den_1_74e22efd409e4f5596a35658737c77eb.webp,pro_den_2_d88182f67f6249478228d824203f5bb5.webp,pro_den_3_4d7bd40d79864fee89bb07efca0f76b0.webp,pro_den_4_a1d3581c3c0e49d7b7403c18ee80ccb8.webp}	455000	4	2023-06-01 17:27:03.965431+07	2023-06-24 14:47:43.897916+07	\N
318	41	2	3	crop876576lblk	pro_den_1_74e22efd409e4f5596a35658737c77eb.webp	{pro_den_1_74e22efd409e4f5596a35658737c77eb.webp,pro_den_2_d88182f67f6249478228d824203f5bb5.webp,pro_den_3_4d7bd40d79864fee89bb07efca0f76b0.webp,pro_den_4_a1d3581c3c0e49d7b7403c18ee80ccb8.webp}	455000	42	2023-06-01 17:27:06.475722+07	2023-06-24 14:47:43.897916+07	\N
319	42	6	1	crop816791swht	pro_trang_1_5ebf4e94219f4d16b2c3832a4765f42a.webp	{pro_trang_1_5ebf4e94219f4d16b2c3832a4765f42a.webp,pro_trang_2_9557afa371354b84b3898cbc466a10f6.webp,pro_trang_3_688e513f8b1d40f08e9ec784cb9cdc93.webp,pro_trang_4_3397f8e2701947768c97bbfa2565c42b.webp}	455000	42	2023-06-01 17:34:54.761973+07	2023-06-24 14:47:43.897916+07	\N
320	42	6	2	crop816791mwht	pro_trang_1_5ebf4e94219f4d16b2c3832a4765f42a.webp	{pro_trang_1_5ebf4e94219f4d16b2c3832a4765f42a.webp,pro_trang_2_9557afa371354b84b3898cbc466a10f6.webp,pro_trang_3_688e513f8b1d40f08e9ec784cb9cdc93.webp,pro_trang_4_3397f8e2701947768c97bbfa2565c42b.webp}	455000	11	2023-06-01 17:34:57.542232+07	2023-06-24 14:47:43.897916+07	\N
321	42	6	3	crop816791lwht	pro_trang_1_5ebf4e94219f4d16b2c3832a4765f42a.webp	{pro_trang_1_5ebf4e94219f4d16b2c3832a4765f42a.webp,pro_trang_2_9557afa371354b84b3898cbc466a10f6.webp,pro_trang_3_688e513f8b1d40f08e9ec784cb9cdc93.webp,pro_trang_4_3397f8e2701947768c97bbfa2565c42b.webp}	455000	13	2023-06-01 17:35:01.402725+07	2023-06-24 14:47:43.897916+07	\N
343	46	3	1	blou598148sblue	pro_xanh_duong_1_ad38468c86ab4361a5875475467054de.webp	{pro_xanh_duong_1_ad38468c86ab4361a5875475467054de.webp,pro_xanh_duong_2_c1ff02874fc24b75986ffcc1355dd2ca.webp,pro_xanh_duong_3_502b380540b945b9b1e97385a7c3bf99.webp,pro_xanh_duong_4_a09e8db86b084f409ce3ed46e37a2689.webp}	755000	22	2023-06-01 17:58:15.194677+07	2023-06-24 14:47:43.897916+07	\N
3	2	4	3	blaz419312ldblu	pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp	{pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp,pro_lam_2_2475ab64808a4a7099b06999207a8d0a_large.webp,pro_lam_3_4801c0d382284ed1aac770af88eebffc_large.webp,pro_lam_4_b5c6f8cdf0034748a943acf0f639a32d_large.webp}	700000	17	2023-05-31 01:13:12.164237+07	2023-06-24 14:47:43.897916+07	\N
4	2	2	1	blaz419312sblk	pro_den_1_09ee625d88d644799f24402ddcadb724.webp	{pro_den_1_09ee625d88d644799f24402ddcadb724.webp,pro_den_2_cc5bfba1426549dab93df40fbf19a0c3.webp,pro_den_3_971008a4d5de491d81069620477ff7c3.webp,pro_den_4_5120d1c167934179b0fd900454ed2395.webp}	695000	15	2023-05-31 01:21:37.286637+07	2023-06-24 14:47:43.897916+07	\N
5	2	2	2	blaz419312mblk	pro_den_1_09ee625d88d644799f24402ddcadb724.webp	{pro_den_1_09ee625d88d644799f24402ddcadb724.webp,pro_den_2_cc5bfba1426549dab93df40fbf19a0c3.webp,pro_den_3_971008a4d5de491d81069620477ff7c3.webp,pro_den_4_5120d1c167934179b0fd900454ed2395.webp}	695000	23	2023-05-31 01:37:47.347172+07	2023-06-24 14:47:43.897916+07	\N
6	2	2	3	blaz419312lblk	pro_den_1_09ee625d88d644799f24402ddcadb724.webp	{pro_den_1_09ee625d88d644799f24402ddcadb724.webp,pro_den_2_cc5bfba1426549dab93df40fbf19a0c3.webp,pro_den_3_971008a4d5de491d81069620477ff7c3.webp,pro_den_4_5120d1c167934179b0fd900454ed2395.webp}	700000	11	2023-05-31 01:38:09.857149+07	2023-06-24 14:47:43.897916+07	\N
8	1	5	2	blaz643515mbro	pro_nau_1_09e1b759486a4ae49e53c411332658d0.webp	{pro_nau_1_09e1b759486a4ae49e53c411332658d0.webp,pro_nau_2_21858c5f86eb4b55a36c84596c3b8db1.webp,pro_nau_3_401558bb37c540b588a774d8086ae57a.webp,pro_nau_4_c1715428d8cb48f0bf566f2ea1df924e.webp}	600000	8	2023-05-31 23:10:32.733987+07	2023-06-24 14:47:43.897916+07	\N
9	1	5	3	blaz643515lbro	pro_nau_1_09e1b759486a4ae49e53c411332658d0.webp	{pro_nau_1_09e1b759486a4ae49e53c411332658d0.webp,pro_nau_2_21858c5f86eb4b55a36c84596c3b8db1.webp,pro_nau_3_401558bb37c540b588a774d8086ae57a.webp,pro_nau_4_c1715428d8cb48f0bf566f2ea1df924e.webp}	650000	5	2023-05-31 23:10:50.962312+07	2023-06-24 14:47:43.897916+07	\N
10	1	2	1	blaz643515sblk	pro_den_1_cc610b0d04d5490cbd54176677936f0f.webp	{pro_den_1_cc610b0d04d5490cbd54176677936f0f.webp,pro_den_2_6334a8c0221648c985f9cf33dc3c503d.webp,pro_den_3_0f8430bb5cfd42f9967d828ccd5c550e.webp,pro_den_4_b71a83da0719423d8412955a76923dc2.webp}	595000	24	2023-05-31 23:16:24.140998+07	2023-06-24 14:47:43.897916+07	\N
11	1	2	3	blaz643515lblk	pro_den_1_cc610b0d04d5490cbd54176677936f0f.webp	{pro_den_1_cc610b0d04d5490cbd54176677936f0f.webp,pro_den_2_6334a8c0221648c985f9cf33dc3c503d.webp,pro_den_3_0f8430bb5cfd42f9967d828ccd5c550e.webp,pro_den_4_b71a83da0719423d8412955a76923dc2.webp}	595000	25	2023-05-31 23:16:57.890872+07	2023-06-24 14:47:43.897916+07	\N
12	1	2	2	blaz643515mblk	pro_den_1_cc610b0d04d5490cbd54176677936f0f.webp	{pro_den_1_cc610b0d04d5490cbd54176677936f0f.webp,pro_den_2_6334a8c0221648c985f9cf33dc3c503d.webp,pro_den_3_0f8430bb5cfd42f9967d828ccd5c550e.webp,pro_den_4_b71a83da0719423d8412955a76923dc2.webp}	595000	24	2023-05-31 23:17:23.750649+07	2023-06-24 14:47:43.897916+07	\N
13	1	6	1	blaz643515swht	pro_trang_1_1d9fe8c2903e4e5a8857cea59f0dab35.webp	{pro_trang_1_1d9fe8c2903e4e5a8857cea59f0dab35.webp,pro_trang_2_3c701a354bba4212846b1bcf671797c9.webp,pro_trang_3_8464d3ac613b46c3bf668434511fedc7.webp,pro_trang_4_1839c6c20a0f4b2a983ec317f0017850.webp}	595000	14	2023-05-31 23:18:33.579691+07	2023-06-24 14:47:43.897916+07	\N
14	1	6	2	blaz643515mwht	pro_trang_1_1d9fe8c2903e4e5a8857cea59f0dab35.webp	{pro_trang_1_1d9fe8c2903e4e5a8857cea59f0dab35.webp,pro_trang_2_3c701a354bba4212846b1bcf671797c9.webp,pro_trang_3_8464d3ac613b46c3bf668434511fedc7.webp,pro_trang_4_1839c6c20a0f4b2a983ec317f0017850.webp}	595000	5	2023-05-31 23:18:44.319979+07	2023-06-24 14:47:43.897916+07	\N
15	1	6	3	blaz643515lwht	pro_trang_1_1d9fe8c2903e4e5a8857cea59f0dab35.webp	{pro_trang_1_1d9fe8c2903e4e5a8857cea59f0dab35.webp,pro_trang_2_3c701a354bba4212846b1bcf671797c9.webp,pro_trang_3_8464d3ac613b46c3bf668434511fedc7.webp,pro_trang_4_1839c6c20a0f4b2a983ec317f0017850.webp}	595000	6	2023-05-31 23:18:55.309703+07	2023-06-24 14:47:43.897916+07	\N
17	3	6	2	blaz669261mwht	pro_trang_1_25bcc01f5e4f43dd8696b57f4ba569d9.webp	{pro_trang_1_25bcc01f5e4f43dd8696b57f4ba569d9.webp,pro_trang_2_92eb763044444392ab1d5cab49a45200.webp,pro_trang_3_76151760eb1d42ca80346de32f07c954.webp,pro_trang_4_4e29875e383448f3bb821a3953496f39.webp}	495000	6	2023-05-31 23:36:39.634584+07	2023-06-24 14:47:43.897916+07	\N
18	3	6	3	blaz669261lwht	pro_trang_1_25bcc01f5e4f43dd8696b57f4ba569d9.webp	{pro_trang_1_25bcc01f5e4f43dd8696b57f4ba569d9.webp,pro_trang_2_92eb763044444392ab1d5cab49a45200.webp,pro_trang_3_76151760eb1d42ca80346de32f07c954.webp,pro_trang_4_4e29875e383448f3bb821a3953496f39.webp}	495000	12	2023-05-31 23:36:51.3247+07	2023-06-24 14:47:43.897916+07	\N
19	3	2	1	blaz669261sblk	pro_den_1_48b57d2024774846a149c74c27ed2ca6.webp	{pro_den_1_48b57d2024774846a149c74c27ed2ca6.webp,pro_den_2_db79b826680a4741b96794a88a5a84d5.webp,pro_den_3_1ffa742f8aa146a7b58247890fa191a2.webp,pro_den_4_a01d812d51514afbaa7b9cccdf947945.webp}	495000	12	2023-05-31 23:37:54.423815+07	2023-06-24 14:47:43.897916+07	\N
20	3	2	2	blaz669261mblk	pro_den_1_48b57d2024774846a149c74c27ed2ca6.webp	{pro_den_1_48b57d2024774846a149c74c27ed2ca6.webp,pro_den_2_db79b826680a4741b96794a88a5a84d5.webp,pro_den_3_1ffa742f8aa146a7b58247890fa191a2.webp,pro_den_4_a01d812d51514afbaa7b9cccdf947945.webp}	495000	12	2023-05-31 23:38:00.813737+07	2023-06-24 14:47:43.897916+07	\N
21	3	2	3	blaz669261lblk	pro_den_1_48b57d2024774846a149c74c27ed2ca6.webp	{pro_den_1_48b57d2024774846a149c74c27ed2ca6.webp,pro_den_2_db79b826680a4741b96794a88a5a84d5.webp,pro_den_3_1ffa742f8aa146a7b58247890fa191a2.webp,pro_den_4_a01d812d51514afbaa7b9cccdf947945.webp}	495000	8	2023-05-31 23:38:23.133027+07	2023-06-24 14:47:43.897916+07	\N
1	2	4	1	blaz419312sdblu	pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp	{pro_lam_1_4c6093b27166479297ed63231ec98dcc.webp,pro_lam_2_2475ab64808a4a7099b06999207a8d0a_large.webp,pro_lam_3_4801c0d382284ed1aac770af88eebffc_large.webp,pro_lam_4_b5c6f8cdf0034748a943acf0f639a32d_large.webp}	695000	13	2023-05-31 01:01:53.417419+07	2023-06-24 14:47:43.897916+07	\N
16	3	6	1	blaz669261swht	pro_trang_1_25bcc01f5e4f43dd8696b57f4ba569d9.webp	{pro_trang_1_25bcc01f5e4f43dd8696b57f4ba569d9.webp,pro_trang_2_92eb763044444392ab1d5cab49a45200.webp,pro_trang_3_76151760eb1d42ca80346de32f07c954.webp,pro_trang_4_4e29875e383448f3bb821a3953496f39.webp}	495000	6	2023-05-31 23:36:33.685101+07	2023-06-24 14:47:43.897916+07	\N
23	3	7	2	blaz669261mlgre	pro_xanh_la_1_1b334116dffb482cbd487fae7733de93.webp	{pro_xanh_la_1_1b334116dffb482cbd487fae7733de93.webp,pro_xanh_la_2_7b493542c5fc4367bb54e64b58e77320.webp,pro_xanh_la_3_6f3898f03ffa467ab3a536509be39739.webp,pro_xanh_la_4_edc85d50a94b49b3b0ae06b1a067a364.webp}	495000	8	2023-05-31 23:39:07.27269+07	2023-06-24 14:47:43.897916+07	\N
24	3	7	3	blaz669261llgre	pro_xanh_la_1_1b334116dffb482cbd487fae7733de93.webp	{pro_xanh_la_1_1b334116dffb482cbd487fae7733de93.webp,pro_xanh_la_2_7b493542c5fc4367bb54e64b58e77320.webp,pro_xanh_la_3_6f3898f03ffa467ab3a536509be39739.webp,pro_xanh_la_4_edc85d50a94b49b3b0ae06b1a067a364.webp}	495000	6	2023-05-31 23:39:14.642744+07	2023-06-24 14:47:43.897916+07	\N
66	7	10	3	pant534097llipik	pro_hong_1_84153e41fe8a449184b91d6c7c2b5a33.webp	{pro_hong_1_84153e41fe8a449184b91d6c7c2b5a33.webp,pro_hong_2_58b05eb3871c4a92966b48a2c910ca0b.webp,pro_hong_3_5c9a8a41324548deb35ca53ad52e447c.webp,pro_hong_4_333539810c1d46cab11850b41d2e23d1.webp}	495000	38	2023-06-01 11:22:57.841323+07	2023-06-24 14:47:43.897916+07	\N
25	4	3	1	blaz670654sblue	pro_xanh_duong_dam_1_a95937d848b34064831843cc24e2cf09.webp	{pro_xanh_duong_dam_1_a95937d848b34064831843cc24e2cf09.webp,pro_xanh_duong_dam_2_d0625bd6670141b2ab1514e1dc21b245.webp,pro_xanh_duong_dam_3_8b0cd367c9bf46d68d29381fcf14fcdf.webp,pro_xanh_duong_dam_4_14e50e4ab6ee41bea26d59a0569d6615.webp}	695000	12	2023-06-01 10:21:20.283424+07	2023-06-24 14:47:43.897916+07	\N
26	4	3	2	blaz670654mblue	pro_xanh_duong_dam_1_a95937d848b34064831843cc24e2cf09.webp	{pro_xanh_duong_dam_1_a95937d848b34064831843cc24e2cf09.webp,pro_xanh_duong_dam_2_d0625bd6670141b2ab1514e1dc21b245.webp,pro_xanh_duong_dam_3_8b0cd367c9bf46d68d29381fcf14fcdf.webp,pro_xanh_duong_dam_4_14e50e4ab6ee41bea26d59a0569d6615.webp}	695000	0	2023-06-01 10:21:43.373423+07	2023-06-24 14:47:43.897916+07	\N
27	4	3	3	blaz670654lblue	pro_xanh_duong_dam_1_a95937d848b34064831843cc24e2cf09.webp	{pro_xanh_duong_dam_1_a95937d848b34064831843cc24e2cf09.webp,pro_xanh_duong_dam_2_d0625bd6670141b2ab1514e1dc21b245.webp,pro_xanh_duong_dam_3_8b0cd367c9bf46d68d29381fcf14fcdf.webp,pro_xanh_duong_dam_4_14e50e4ab6ee41bea26d59a0569d6615.webp}	695000	3	2023-06-01 10:21:48.583838+07	2023-06-24 14:47:43.897916+07	\N
28	4	8	1	blaz670654slpik	pro_hong_nhat_1_10f1dda2225c47cfa093351ee270bd06.webp	{pro_hong_nhat_1_10f1dda2225c47cfa093351ee270bd06.webp,pro_hong_nhat_2_43833888b2124692b98f4d2263dd277f.webp,pro_hong_nhat_3_465ba94f19a54bfdafe3090b41d5cbe4.webp,pro_hong_nhat_4_42f669fc9f65443babbe69d2d357d209.webp}	695000	3	2023-06-01 10:23:56.782637+07	2023-06-24 14:47:43.897916+07	\N
29	4	8	2	blaz670654mlpik	pro_hong_nhat_1_10f1dda2225c47cfa093351ee270bd06.webp	{pro_hong_nhat_1_10f1dda2225c47cfa093351ee270bd06.webp,pro_hong_nhat_2_43833888b2124692b98f4d2263dd277f.webp,pro_hong_nhat_3_465ba94f19a54bfdafe3090b41d5cbe4.webp,pro_hong_nhat_4_42f669fc9f65443babbe69d2d357d209.webp}	695000	12	2023-06-01 10:24:26.382386+07	2023-06-24 14:47:43.897916+07	\N
30	4	8	3	blaz670654llpik	pro_hong_nhat_1_10f1dda2225c47cfa093351ee270bd06.webp	{pro_hong_nhat_1_10f1dda2225c47cfa093351ee270bd06.webp,pro_hong_nhat_2_43833888b2124692b98f4d2263dd277f.webp,pro_hong_nhat_3_465ba94f19a54bfdafe3090b41d5cbe4.webp,pro_hong_nhat_4_42f669fc9f65443babbe69d2d357d209.webp}	695000	1	2023-06-01 10:24:50.142983+07	2023-06-24 14:47:43.897916+07	\N
31	4	2	1	blaz670654sblk	pro_den_4_0f6206ecc6164f7f96a9bc9539d7980d.webp	{pro_den_4_0f6206ecc6164f7f96a9bc9539d7980d.webp,pro_den_3_6e98b9f0917c41c99b7250c0c68f82ce.webp,pro_den_2_183889107d604f6995a52a04172bcfa7.webp,pro_den_1_32a7dc36ab924be8b4287358e04b6146.webp}	695000	12	2023-06-01 10:27:37.800453+07	2023-06-24 14:47:43.897916+07	\N
32	4	2	2	blaz670654mblk	pro_den_4_0f6206ecc6164f7f96a9bc9539d7980d.webp	{pro_den_4_0f6206ecc6164f7f96a9bc9539d7980d.webp,pro_den_3_6e98b9f0917c41c99b7250c0c68f82ce.webp,pro_den_2_183889107d604f6995a52a04172bcfa7.webp,pro_den_1_32a7dc36ab924be8b4287358e04b6146.webp}	695000	12	2023-06-01 10:27:45.01163+07	2023-06-24 14:47:43.897916+07	\N
33	4	2	3	blaz670654lblk	pro_den_4_0f6206ecc6164f7f96a9bc9539d7980d.webp	{pro_den_4_0f6206ecc6164f7f96a9bc9539d7980d.webp,pro_den_3_6e98b9f0917c41c99b7250c0c68f82ce.webp,pro_den_2_183889107d604f6995a52a04172bcfa7.webp,pro_den_1_32a7dc36ab924be8b4287358e04b6146.webp}	695000	5	2023-06-01 10:27:55.620394+07	2023-06-24 14:47:43.897916+07	\N
34	4	6	1	blaz670654swht	pro_trang_4_19f7409bdee0436e93d7f38db7014ed3.webp	{pro_trang_4_19f7409bdee0436e93d7f38db7014ed3.webp,pro_trang_3_934a0a823f55484c8beb34fa6285c5e1.webp,pro_trang_2_cc7a80fcaed045408ce8f30d208e6c4d.webp,pro_trang_1_4fb1c7f6dbc243e0befe69cfb2730b59.webp}	695000	5	2023-06-01 10:28:16.570063+07	2023-06-24 14:47:43.897916+07	\N
35	4	6	2	blaz670654mwht	pro_trang_4_19f7409bdee0436e93d7f38db7014ed3.webp	{pro_trang_4_19f7409bdee0436e93d7f38db7014ed3.webp,pro_trang_3_934a0a823f55484c8beb34fa6285c5e1.webp,pro_trang_2_cc7a80fcaed045408ce8f30d208e6c4d.webp,pro_trang_1_4fb1c7f6dbc243e0befe69cfb2730b59.webp}	695000	5	2023-06-01 10:28:18.585298+07	2023-06-24 14:47:43.897916+07	\N
36	4	6	3	blaz670654lwht	pro_trang_4_19f7409bdee0436e93d7f38db7014ed3.webp	{pro_trang_4_19f7409bdee0436e93d7f38db7014ed3.webp,pro_trang_3_934a0a823f55484c8beb34fa6285c5e1.webp,pro_trang_2_cc7a80fcaed045408ce8f30d208e6c4d.webp,pro_trang_1_4fb1c7f6dbc243e0befe69cfb2730b59.webp}	695000	3	2023-06-01 10:28:23.219629+07	2023-06-24 14:47:43.897916+07	\N
38	5	9	2	blaz611959mjgre	pro_xanh_la_1_6c02f5279de1432fae6d0554f069a26e.webp	{pro_xanh_la_1_6c02f5279de1432fae6d0554f069a26e.webp,pro_xanh_la_2_c2d4ed091a754768a632e8d91ca07649.webp,pro_xanh_la_3_aeaa9c87ab6848f59a05cb548611adf2.webp,pro_xanh_la_4_d8ae3c8f1f9c458d9d87bcf9443de8b6.webp}	595000	5	2023-06-01 10:43:40.02216+07	2023-06-24 14:47:43.897916+07	\N
39	5	9	3	blaz611959ljgre	pro_xanh_la_1_6c02f5279de1432fae6d0554f069a26e.webp	{pro_xanh_la_1_6c02f5279de1432fae6d0554f069a26e.webp,pro_xanh_la_2_c2d4ed091a754768a632e8d91ca07649.webp,pro_xanh_la_3_aeaa9c87ab6848f59a05cb548611adf2.webp,pro_xanh_la_4_d8ae3c8f1f9c458d9d87bcf9443de8b6.webp}	595000	7	2023-06-01 10:44:00.160498+07	2023-06-24 14:47:43.897916+07	\N
40	5	2	1	blaz611959sblk	pro_den_1_716ea6ed3cde43f6b83cbb78de886e8e.webp	{pro_den_1_716ea6ed3cde43f6b83cbb78de886e8e.webp,pro_den_2_136cd37647054556a03dfb1e30132adc.webp,pro_den_3_4bec9897044b4e4395e14f84789acea1.webp,pro_den_4_67d45d3845a943c3a9fdd14e75f68b2c.webp}	595000	7	2023-06-01 10:52:42.703827+07	2023-06-24 14:47:43.897916+07	\N
41	5	2	2	blaz611959mblk	pro_den_1_716ea6ed3cde43f6b83cbb78de886e8e.webp	{pro_den_1_716ea6ed3cde43f6b83cbb78de886e8e.webp,pro_den_2_136cd37647054556a03dfb1e30132adc.webp,pro_den_3_4bec9897044b4e4395e14f84789acea1.webp,pro_den_4_67d45d3845a943c3a9fdd14e75f68b2c.webp}	595000	7	2023-06-01 10:52:46.545473+07	2023-06-24 14:47:43.897916+07	\N
42	5	2	3	blaz611959lblk	pro_den_1_716ea6ed3cde43f6b83cbb78de886e8e.webp	{pro_den_1_716ea6ed3cde43f6b83cbb78de886e8e.webp,pro_den_2_136cd37647054556a03dfb1e30132adc.webp,pro_den_3_4bec9897044b4e4395e14f84789acea1.webp,pro_den_4_67d45d3845a943c3a9fdd14e75f68b2c.webp}	595000	17	2023-06-01 10:52:53.613293+07	2023-06-24 14:47:43.897916+07	\N
43	5	10	1	blaz611959slipik	pro_hong_dam_1_ed77c93c8b394ee0b6e4647f6b989252.webp	{pro_hong_dam_1_ed77c93c8b394ee0b6e4647f6b989252.webp,pro_hong_dam_2_d08fb83a5bcc4b46a21743fe5f519b64.webp,pro_hong_dam_3_a500cf39e9824b1ba3e4419097816b57.webp,pro_hong_dam_4_96fb0531d83e4f35987e8fed2e1e42e2.webp}	595000	6	2023-06-01 10:53:36.223577+07	2023-06-24 14:47:43.897916+07	\N
44	5	10	2	blaz611959mlipik	pro_hong_dam_1_ed77c93c8b394ee0b6e4647f6b989252.webp	{pro_hong_dam_1_ed77c93c8b394ee0b6e4647f6b989252.webp,pro_hong_dam_2_d08fb83a5bcc4b46a21743fe5f519b64.webp,pro_hong_dam_3_a500cf39e9824b1ba3e4419097816b57.webp,pro_hong_dam_4_96fb0531d83e4f35987e8fed2e1e42e2.webp}	595000	27	2023-06-01 10:53:40.582399+07	2023-06-24 14:47:43.897916+07	\N
45	5	10	3	blaz611959llipik	pro_hong_dam_1_ed77c93c8b394ee0b6e4647f6b989252.webp	{pro_hong_dam_1_ed77c93c8b394ee0b6e4647f6b989252.webp,pro_hong_dam_2_d08fb83a5bcc4b46a21743fe5f519b64.webp,pro_hong_dam_3_a500cf39e9824b1ba3e4419097816b57.webp,pro_hong_dam_4_96fb0531d83e4f35987e8fed2e1e42e2.webp}	595000	18	2023-06-01 10:56:22.701168+07	2023-06-24 14:47:43.897916+07	\N
46	6	10	1	blaz945630slipik	pro_hong_dam_1_12d2e5561fc94c049748feec305ae001.webp	{pro_hong_dam_1_12d2e5561fc94c049748feec305ae001.webp,pro_hong_dam_2_e2639103db4d481282cb3ea1cf7edb42.webp,pro_hong_dam_3_4cb9f539bcc14bb9a868ecafed539c05.webp,pro_hong_dam_4_e4a751ddc0b843fcb5d3bb44188cbb12.webp}	595000	8	2023-06-01 11:00:17.747971+07	2023-06-24 14:47:43.897916+07	\N
47	6	10	2	blaz945630mlipik	pro_hong_dam_1_12d2e5561fc94c049748feec305ae001.webp	{pro_hong_dam_1_12d2e5561fc94c049748feec305ae001.webp,pro_hong_dam_2_e2639103db4d481282cb3ea1cf7edb42.webp,pro_hong_dam_3_4cb9f539bcc14bb9a868ecafed539c05.webp,pro_hong_dam_4_e4a751ddc0b843fcb5d3bb44188cbb12.webp}	595000	12	2023-06-01 11:00:20.21927+07	2023-06-24 14:47:43.897916+07	\N
48	6	10	3	blaz945630llipik	pro_hong_dam_1_12d2e5561fc94c049748feec305ae001.webp	{pro_hong_dam_1_12d2e5561fc94c049748feec305ae001.webp,pro_hong_dam_2_e2639103db4d481282cb3ea1cf7edb42.webp,pro_hong_dam_3_4cb9f539bcc14bb9a868ecafed539c05.webp,pro_hong_dam_4_e4a751ddc0b843fcb5d3bb44188cbb12.webp}	595000	8	2023-06-01 11:00:24.637007+07	2023-06-24 14:47:43.897916+07	\N
49	6	2	1	blaz945630sblk	pro_den_1_8de21d47f96e43cd88836535793be870.webp	{pro_den_1_8de21d47f96e43cd88836535793be870.webp,pro_den_2_2a232c973618479da90af011277e4726.webp,pro_den_3_c19614e584a143f59aae2bf2db3e133a.webp,pro_den_4_95858d3344b2473aa79494dfba07e12f.webp}	595000	8	2023-06-01 11:00:42.436251+07	2023-06-24 14:47:43.897916+07	\N
50	6	2	2	blaz945630mblk	pro_den_1_8de21d47f96e43cd88836535793be870.webp	{pro_den_1_8de21d47f96e43cd88836535793be870.webp,pro_den_2_2a232c973618479da90af011277e4726.webp,pro_den_3_c19614e584a143f59aae2bf2db3e133a.webp,pro_den_4_95858d3344b2473aa79494dfba07e12f.webp}	595000	12	2023-06-01 11:00:49.046058+07	2023-06-24 14:47:43.897916+07	\N
51	6	2	3	blaz945630lblk	pro_den_1_8de21d47f96e43cd88836535793be870.webp	{pro_den_1_8de21d47f96e43cd88836535793be870.webp,pro_den_2_2a232c973618479da90af011277e4726.webp,pro_den_3_c19614e584a143f59aae2bf2db3e133a.webp,pro_den_4_95858d3344b2473aa79494dfba07e12f.webp}	595000	4	2023-06-01 11:01:09.026536+07	2023-06-24 14:47:43.897916+07	\N
52	6	9	1	blaz945630sjgre	pro_xanh_la_1_99614c3687fb4c28acd5e404a663bee8.webp	{pro_xanh_la_1_99614c3687fb4c28acd5e404a663bee8.webp,pro_xanh_la_2_60d3519de0a44c3caf45ae81170cc018.webp,pro_xanh_la_3_13fc9cf781334c00b1f23878e10f338e.webp,pro_xanh_la_4_4c84184c774a4432b0826f54fda0b27a.webp}	595000	6	2023-06-01 11:01:34.816757+07	2023-06-24 14:47:43.897916+07	\N
53	6	9	2	blaz945630mjgre	pro_xanh_la_1_99614c3687fb4c28acd5e404a663bee8.webp	{pro_xanh_la_1_99614c3687fb4c28acd5e404a663bee8.webp,pro_xanh_la_2_60d3519de0a44c3caf45ae81170cc018.webp,pro_xanh_la_3_13fc9cf781334c00b1f23878e10f338e.webp,pro_xanh_la_4_4c84184c774a4432b0826f54fda0b27a.webp}	595000	17	2023-06-01 11:01:41.185053+07	2023-06-24 14:47:43.897916+07	\N
54	6	9	3	blaz945630ljgre	pro_xanh_la_1_99614c3687fb4c28acd5e404a663bee8.webp	{pro_xanh_la_1_99614c3687fb4c28acd5e404a663bee8.webp,pro_xanh_la_2_60d3519de0a44c3caf45ae81170cc018.webp,pro_xanh_la_3_13fc9cf781334c00b1f23878e10f338e.webp,pro_xanh_la_4_4c84184c774a4432b0826f54fda0b27a.webp}	595000	1	2023-06-01 11:01:46.7582+07	2023-06-24 14:47:43.897916+07	\N
55	7	6	1	pant534097swht	pro_trang_1_a3931b06381641fa91d66f6430a6af18.webp	{pro_trang_1_a3931b06381641fa91d66f6430a6af18.webp,pro_trang_2_c0ad4dd575a04a759ebf9e25c030fbf6.webp,pro_trang_3_2b7133cb9a4543baafdd1377890119e5.webp,pro_trang_4_b8a402c4c3154ad18f54365bff5258f6.webp}	495000	8	2023-06-01 11:19:12.013595+07	2023-06-24 14:47:43.897916+07	\N
56	7	6	2	pant534097mwht	pro_trang_1_a3931b06381641fa91d66f6430a6af18.webp	{pro_trang_1_a3931b06381641fa91d66f6430a6af18.webp,pro_trang_2_c0ad4dd575a04a759ebf9e25c030fbf6.webp,pro_trang_3_2b7133cb9a4543baafdd1377890119e5.webp,pro_trang_4_b8a402c4c3154ad18f54365bff5258f6.webp}	495000	12	2023-06-01 11:19:24.144322+07	2023-06-24 14:47:43.897916+07	\N
57	7	6	3	pant534097lwht	pro_trang_1_a3931b06381641fa91d66f6430a6af18.webp	{pro_trang_1_a3931b06381641fa91d66f6430a6af18.webp,pro_trang_2_c0ad4dd575a04a759ebf9e25c030fbf6.webp,pro_trang_3_2b7133cb9a4543baafdd1377890119e5.webp,pro_trang_4_b8a402c4c3154ad18f54365bff5258f6.webp}	495000	36	2023-06-01 11:19:35.353594+07	2023-06-24 14:47:43.897916+07	\N
58	7	2	1	pant534097sblk	pro_den_4_bb88bc1047094942b2f47c6aded6fef3.webp	{pro_den_4_bb88bc1047094942b2f47c6aded6fef3.webp,pro_den_3_2c78e684d3e84536850c00f07a993a70.webp,pro_den_2_69ec51c3f29847daa35a9967d601f182.webp,pro_den_1_cad65a0e849d4873908cfa7482174722.webp}	495000	36	2023-06-01 11:20:12.672785+07	2023-06-24 14:47:43.897916+07	\N
59	7	2	2	pant534097mblk	pro_den_4_bb88bc1047094942b2f47c6aded6fef3.webp	{pro_den_4_bb88bc1047094942b2f47c6aded6fef3.webp,pro_den_3_2c78e684d3e84536850c00f07a993a70.webp,pro_den_2_69ec51c3f29847daa35a9967d601f182.webp,pro_den_1_cad65a0e849d4873908cfa7482174722.webp}	495000	10	2023-06-01 11:20:32.481738+07	2023-06-24 14:47:43.897916+07	\N
60	7	2	3	pant534097lblk	pro_den_4_bb88bc1047094942b2f47c6aded6fef3.webp	{pro_den_4_bb88bc1047094942b2f47c6aded6fef3.webp,pro_den_3_2c78e684d3e84536850c00f07a993a70.webp,pro_den_2_69ec51c3f29847daa35a9967d601f182.webp,pro_den_1_cad65a0e849d4873908cfa7482174722.webp}	495000	27	2023-06-01 11:20:38.830848+07	2023-06-24 14:47:43.897916+07	\N
61	7	8	1	pant534097slpik	pro_hong_nhat_1_08cb57565e6d489ca60883f4904822d8.webp	{pro_hong_nhat_1_08cb57565e6d489ca60883f4904822d8.webp,pro_hong_nhat_2_02bc604bbbe845b4978892924dcd61bf.webp,pro_hong_nhat_3_554b3c62aee24465b4396b0abd699b29.webp,pro_hong_nhat_4_3e7bd52835d143d3b02aa19ba88e9660.webp}	495000	8	2023-06-01 11:21:46.37971+07	2023-06-24 14:47:43.897916+07	\N
62	7	8	2	pant534097mlpik	pro_hong_nhat_1_08cb57565e6d489ca60883f4904822d8.webp	{pro_hong_nhat_1_08cb57565e6d489ca60883f4904822d8.webp,pro_hong_nhat_2_02bc604bbbe845b4978892924dcd61bf.webp,pro_hong_nhat_3_554b3c62aee24465b4396b0abd699b29.webp,pro_hong_nhat_4_3e7bd52835d143d3b02aa19ba88e9660.webp}	495000	8	2023-06-01 11:21:48.481593+07	2023-06-24 14:47:43.897916+07	\N
63	7	8	3	pant534097llpik	pro_hong_nhat_1_08cb57565e6d489ca60883f4904822d8.webp	{pro_hong_nhat_1_08cb57565e6d489ca60883f4904822d8.webp,pro_hong_nhat_2_02bc604bbbe845b4978892924dcd61bf.webp,pro_hong_nhat_3_554b3c62aee24465b4396b0abd699b29.webp,pro_hong_nhat_4_3e7bd52835d143d3b02aa19ba88e9660.webp}	495000	17	2023-06-01 11:21:51.761377+07	2023-06-24 14:47:43.897916+07	\N
64	7	10	1	pant534097slipik	pro_hong_1_84153e41fe8a449184b91d6c7c2b5a33.webp	{pro_hong_1_84153e41fe8a449184b91d6c7c2b5a33.webp,pro_hong_2_58b05eb3871c4a92966b48a2c910ca0b.webp,pro_hong_3_5c9a8a41324548deb35ca53ad52e447c.webp,pro_hong_4_333539810c1d46cab11850b41d2e23d1.webp}	495000	17	2023-06-01 11:22:46.499534+07	2023-06-24 14:47:43.897916+07	\N
65	7	10	2	pant534097mlipik	pro_hong_1_84153e41fe8a449184b91d6c7c2b5a33.webp	{pro_hong_1_84153e41fe8a449184b91d6c7c2b5a33.webp,pro_hong_2_58b05eb3871c4a92966b48a2c910ca0b.webp,pro_hong_3_5c9a8a41324548deb35ca53ad52e447c.webp,pro_hong_4_333539810c1d46cab11850b41d2e23d1.webp}	495000	27	2023-06-01 11:22:52.610291+07	2023-06-24 14:47:43.897916+07	\N
67	7	4	1	pant534097sdblu	pro_xanh_den_1_b8652269d95440ef9a2a9de1e9913041.webp	{pro_xanh_den_1_b8652269d95440ef9a2a9de1e9913041.webp,pro_xanh_den_2_1f6e6c88575c4c67817b4a2f6e84513d.webp,pro_xanh_den_3_4ed25a6e306846f88a9c8c76eee1dbbf.webp,pro_xanh_den_4_84ad23affff4499aa2b0cf83a858e053.webp}	495000	38	2023-06-01 11:23:50.619224+07	2023-06-24 14:47:43.897916+07	\N
68	7	4	2	pant534097mdblu	pro_xanh_den_1_b8652269d95440ef9a2a9de1e9913041.webp	{pro_xanh_den_1_b8652269d95440ef9a2a9de1e9913041.webp,pro_xanh_den_2_1f6e6c88575c4c67817b4a2f6e84513d.webp,pro_xanh_den_3_4ed25a6e306846f88a9c8c76eee1dbbf.webp,pro_xanh_den_4_84ad23affff4499aa2b0cf83a858e053.webp}	495000	38	2023-06-01 11:23:53.120077+07	2023-06-24 14:47:43.897916+07	\N
69	7	4	3	pant534097ldblu	pro_xanh_den_1_b8652269d95440ef9a2a9de1e9913041.webp	{pro_xanh_den_1_b8652269d95440ef9a2a9de1e9913041.webp,pro_xanh_den_2_1f6e6c88575c4c67817b4a2f6e84513d.webp,pro_xanh_den_3_4ed25a6e306846f88a9c8c76eee1dbbf.webp,pro_xanh_den_4_84ad23affff4499aa2b0cf83a858e053.webp}	495000	42	2023-06-01 11:23:59.549571+07	2023-06-24 14:47:43.897916+07	\N
70	8	2	1	pant975379sblk	pro_den_4_23f2af9827dd4a22abf43a9a5a317d8b.webp	{pro_den_4_23f2af9827dd4a22abf43a9a5a317d8b.webp,pro_den_3_571ebabedd564d64a5d4296bed1dabf0.webp,pro_den_2_09bf30977d434a42a584f45ddbdceb05.webp,pro_den_1_da8478d915e74729bf6507becafee021.webp}	495000	27	2023-06-01 11:30:31.463829+07	2023-06-24 14:47:43.897916+07	\N
71	8	2	2	pant975379mblk	pro_den_4_23f2af9827dd4a22abf43a9a5a317d8b.webp	{pro_den_4_23f2af9827dd4a22abf43a9a5a317d8b.webp,pro_den_3_571ebabedd564d64a5d4296bed1dabf0.webp,pro_den_2_09bf30977d434a42a584f45ddbdceb05.webp,pro_den_1_da8478d915e74729bf6507becafee021.webp}	495000	24	2023-06-01 11:30:37.38601+07	2023-06-24 14:47:43.897916+07	\N
72	8	2	3	pant975379lblk	pro_den_4_23f2af9827dd4a22abf43a9a5a317d8b.webp	{pro_den_4_23f2af9827dd4a22abf43a9a5a317d8b.webp,pro_den_3_571ebabedd564d64a5d4296bed1dabf0.webp,pro_den_2_09bf30977d434a42a584f45ddbdceb05.webp,pro_den_1_da8478d915e74729bf6507becafee021.webp}	495000	24	2023-06-01 11:30:40.221292+07	2023-06-24 14:47:43.897916+07	\N
73	8	11	1	pant975379svani	pro_kem_1_5cfa325777524898a5eb9f866848c5c1.webp	{pro_kem_1_5cfa325777524898a5eb9f866848c5c1.webp,pro_kem_2_845f967f2a064d28af1fc2ab5b486ec5.webp,pro_kem_3_fb4a74c5a4344b2ebc93a95215473177.webp,pro_kem_4_dc1805d09f214c9f82ad99af550ffb51.webp}	495000	42	2023-06-01 11:32:26.092819+07	2023-06-24 14:47:43.897916+07	\N
74	8	11	2	pant975379mvani	pro_kem_1_5cfa325777524898a5eb9f866848c5c1.webp	{pro_kem_1_5cfa325777524898a5eb9f866848c5c1.webp,pro_kem_2_845f967f2a064d28af1fc2ab5b486ec5.webp,pro_kem_3_fb4a74c5a4344b2ebc93a95215473177.webp,pro_kem_4_dc1805d09f214c9f82ad99af550ffb51.webp}	495000	42	2023-06-01 11:32:28.532156+07	2023-06-24 14:47:43.897916+07	\N
75	8	11	3	pant975379lvani	pro_kem_1_5cfa325777524898a5eb9f866848c5c1.webp	{pro_kem_1_5cfa325777524898a5eb9f866848c5c1.webp,pro_kem_2_845f967f2a064d28af1fc2ab5b486ec5.webp,pro_kem_3_fb4a74c5a4344b2ebc93a95215473177.webp,pro_kem_4_dc1805d09f214c9f82ad99af550ffb51.webp}	495000	25	2023-06-01 11:33:33.943121+07	2023-06-24 14:47:43.897916+07	\N
76	9	4	1	pant110209sdblu	pro_xanh_duong_dam_1_a6208fdd907648f782a42319aec11513.webp	{pro_xanh_duong_dam_1_a6208fdd907648f782a42319aec11513.webp,pro_xanh_duong_dam_2_bfd09904dcca4480a5d39867d6b51018.webp,pro_xanh_duong_dam_3_e34c5caa07674fc0a41d56173fb1e6f3.webp,pro_xanh_duong_dam_4_19de200019a9491c900dd08655f015f6.webp}	495000	25	2023-06-01 11:49:38.741794+07	2023-06-24 14:47:43.897916+07	\N
77	9	4	2	pant110209mdblu	pro_xanh_duong_dam_1_a6208fdd907648f782a42319aec11513.webp	{pro_xanh_duong_dam_1_a6208fdd907648f782a42319aec11513.webp,pro_xanh_duong_dam_2_bfd09904dcca4480a5d39867d6b51018.webp,pro_xanh_duong_dam_3_e34c5caa07674fc0a41d56173fb1e6f3.webp,pro_xanh_duong_dam_4_19de200019a9491c900dd08655f015f6.webp}	495000	7	2023-06-01 11:49:42.533022+07	2023-06-24 14:47:43.897916+07	\N
78	9	4	3	pant110209ldblu	pro_xanh_duong_dam_1_a6208fdd907648f782a42319aec11513.webp	{pro_xanh_duong_dam_1_a6208fdd907648f782a42319aec11513.webp,pro_xanh_duong_dam_2_bfd09904dcca4480a5d39867d6b51018.webp,pro_xanh_duong_dam_3_e34c5caa07674fc0a41d56173fb1e6f3.webp,pro_xanh_duong_dam_4_19de200019a9491c900dd08655f015f6.webp}	495000	18	2023-06-01 11:49:49.97349+07	2023-06-24 14:47:43.897916+07	\N
79	9	2	1	pant110209sblk	pro_den_1_97ab31b436784e77ac60c44b5f9b805c.webp	{pro_den_1_97ab31b436784e77ac60c44b5f9b805c.webp,pro_den_2_3fb9e3e740a84eb2aad6ed8dfed76339.webp,pro_den_3_a5b6bc3a696f4d83b5e6cb1737a785c8.webp,pro_den_4_003b792d2adf4f19aaf90b6a9e70e4f5.webp}	495000	18	2023-06-01 11:50:08.091554+07	2023-06-24 14:47:43.897916+07	\N
80	9	2	2	pant110209mblk	pro_den_1_97ab31b436784e77ac60c44b5f9b805c.webp	{pro_den_1_97ab31b436784e77ac60c44b5f9b805c.webp,pro_den_2_3fb9e3e740a84eb2aad6ed8dfed76339.webp,pro_den_3_a5b6bc3a696f4d83b5e6cb1737a785c8.webp,pro_den_4_003b792d2adf4f19aaf90b6a9e70e4f5.webp}	495000	24	2023-06-01 11:50:15.081249+07	2023-06-24 14:47:43.897916+07	\N
81	9	2	3	pant110209lblk	pro_den_1_97ab31b436784e77ac60c44b5f9b805c.webp	{pro_den_1_97ab31b436784e77ac60c44b5f9b805c.webp,pro_den_2_3fb9e3e740a84eb2aad6ed8dfed76339.webp,pro_den_3_a5b6bc3a696f4d83b5e6cb1737a785c8.webp,pro_den_4_003b792d2adf4f19aaf90b6a9e70e4f5.webp}	495000	24	2023-06-01 11:50:20.552621+07	2023-06-24 14:47:43.897916+07	\N
82	9	5	1	pant110209sbro	pro_nau_1_1bf42854008e4e5d95e0a840b0825568.webp	{pro_nau_1_1bf42854008e4e5d95e0a840b0825568.webp,pro_nau_2_9d7f5b9e21354a1facc6400ad04757e1.webp,pro_nau_3_c8c52e5e9c954a89a8e55575583d518f.webp,pro_nau_4_1aac3978d28541c5b059c27be4ca3a84.webp}	495000	24	2023-06-01 11:50:40.310438+07	2023-06-24 14:47:43.897916+07	\N
83	9	5	2	pant110209mbro	pro_nau_1_1bf42854008e4e5d95e0a840b0825568.webp	{pro_nau_1_1bf42854008e4e5d95e0a840b0825568.webp,pro_nau_2_9d7f5b9e21354a1facc6400ad04757e1.webp,pro_nau_3_c8c52e5e9c954a89a8e55575583d518f.webp,pro_nau_4_1aac3978d28541c5b059c27be4ca3a84.webp}	495000	24	2023-06-01 11:50:42.122376+07	2023-06-24 14:47:43.897916+07	\N
84	9	5	3	pant110209lbro	pro_nau_1_1bf42854008e4e5d95e0a840b0825568.webp	{pro_nau_1_1bf42854008e4e5d95e0a840b0825568.webp,pro_nau_2_9d7f5b9e21354a1facc6400ad04757e1.webp,pro_nau_3_c8c52e5e9c954a89a8e55575583d518f.webp,pro_nau_4_1aac3978d28541c5b059c27be4ca3a84.webp}	495000	7	2023-06-01 11:50:45.712186+07	2023-06-24 14:47:43.897916+07	\N
85	10	12	1	pant919936slblu	pro_xanh_duong_1_59a527cf62e647c084c757bb0ae8f3b7.webp	{pro_xanh_duong_1_59a527cf62e647c084c757bb0ae8f3b7.webp,pro_xanh_duong_2_98f1dd118eec439db28bdeaac90da16c.webp,pro_xanh_duong_3_ca15639169564d8b927c90d53a9a1a7b.webp,pro_xanh_duong_4_600d6a8e8b2a4d16bd581a7dd5216b46.webp}	495000	7	2023-06-01 12:01:18.052293+07	2023-06-24 14:47:43.897916+07	\N
86	10	12	2	pant919936mlblu	pro_xanh_duong_1_59a527cf62e647c084c757bb0ae8f3b7.webp	{pro_xanh_duong_1_59a527cf62e647c084c757bb0ae8f3b7.webp,pro_xanh_duong_2_98f1dd118eec439db28bdeaac90da16c.webp,pro_xanh_duong_3_ca15639169564d8b927c90d53a9a1a7b.webp,pro_xanh_duong_4_600d6a8e8b2a4d16bd581a7dd5216b46.webp}	495000	7	2023-06-01 12:01:22.35307+07	2023-06-24 14:47:43.897916+07	\N
87	10	12	3	pant919936llblu	pro_xanh_duong_1_59a527cf62e647c084c757bb0ae8f3b7.webp	{pro_xanh_duong_1_59a527cf62e647c084c757bb0ae8f3b7.webp,pro_xanh_duong_2_98f1dd118eec439db28bdeaac90da16c.webp,pro_xanh_duong_3_ca15639169564d8b927c90d53a9a1a7b.webp,pro_xanh_duong_4_600d6a8e8b2a4d16bd581a7dd5216b46.webp}	495000	7	2023-06-01 12:01:24.262165+07	2023-06-24 14:47:43.897916+07	\N
88	10	13	1	pant919936sdgre	pro_xanh_la_dam_1_9f48dd8048714c3abb2beee360a6023a.webp	{pro_xanh_la_dam_1_9f48dd8048714c3abb2beee360a6023a.webp,pro_xanh_la_dam_2_148cf214cab54e55b0dbcc7edc4ba226.webp,pro_xanh_la_dam_3_bffa162ee36c49c09ec0d345629f7ce7.webp,pro_xanh_la_dam_4_6b748986be394001b925ede018958725.webp}	495000	7	2023-06-01 12:01:55.431665+07	2023-06-24 14:47:43.897916+07	\N
89	10	13	2	pant919936mdgre	pro_xanh_la_dam_1_9f48dd8048714c3abb2beee360a6023a.webp	{pro_xanh_la_dam_1_9f48dd8048714c3abb2beee360a6023a.webp,pro_xanh_la_dam_2_148cf214cab54e55b0dbcc7edc4ba226.webp,pro_xanh_la_dam_3_bffa162ee36c49c09ec0d345629f7ce7.webp,pro_xanh_la_dam_4_6b748986be394001b925ede018958725.webp}	495000	7	2023-06-01 12:01:58.615254+07	2023-06-24 14:47:43.897916+07	\N
90	10	13	3	pant919936ldgre	pro_xanh_la_dam_1_9f48dd8048714c3abb2beee360a6023a.webp	{pro_xanh_la_dam_1_9f48dd8048714c3abb2beee360a6023a.webp,pro_xanh_la_dam_2_148cf214cab54e55b0dbcc7edc4ba226.webp,pro_xanh_la_dam_3_bffa162ee36c49c09ec0d345629f7ce7.webp,pro_xanh_la_dam_4_6b748986be394001b925ede018958725.webp}	495000	12	2023-06-01 12:02:46.620293+07	2023-06-24 14:47:43.897916+07	\N
91	10	10	1	pant919936slipik	pro_hong_dam_1_aab98c66b8f84ba293fdc398b1a069dc.webp	{pro_hong_dam_1_aab98c66b8f84ba293fdc398b1a069dc.webp,pro_hong_dam_2_4ebb441c7f814b03aaeda6c50775cc37.webp,pro_hong_dam_3_0508b44a03284c9eb0b2b7bc12b6c2ec.webp,pro_hong_dam_4_66372f2c972346228212a3e7abf2f0e1.webp}	495000	12	2023-06-01 12:04:15.139247+07	2023-06-24 14:47:43.897916+07	\N
92	10	10	2	pant919936mlipik	pro_hong_dam_1_aab98c66b8f84ba293fdc398b1a069dc.webp	{pro_hong_dam_1_aab98c66b8f84ba293fdc398b1a069dc.webp,pro_hong_dam_2_4ebb441c7f814b03aaeda6c50775cc37.webp,pro_hong_dam_3_0508b44a03284c9eb0b2b7bc12b6c2ec.webp,pro_hong_dam_4_66372f2c972346228212a3e7abf2f0e1.webp}	495000	12	2023-06-01 12:04:17.548807+07	2023-06-24 14:47:43.897916+07	\N
93	10	10	3	pant919936llipik	pro_hong_dam_1_aab98c66b8f84ba293fdc398b1a069dc.webp	{pro_hong_dam_1_aab98c66b8f84ba293fdc398b1a069dc.webp,pro_hong_dam_2_4ebb441c7f814b03aaeda6c50775cc37.webp,pro_hong_dam_3_0508b44a03284c9eb0b2b7bc12b6c2ec.webp,pro_hong_dam_4_66372f2c972346228212a3e7abf2f0e1.webp}	495000	5	2023-06-01 12:04:21.359437+07	2023-06-24 14:47:43.897916+07	\N
97	11	14	1	shor857918swhe	pro_vang_1_edcb32beac004d5d85a5c2c2a1d389b1.webp	{pro_vang_1_edcb32beac004d5d85a5c2c2a1d389b1.webp,pro_vang_2_365d5999497e4e5b8984f5471bf42b92.webp,pro_vang_3_469366c9119d4e87853d5ca1601c8386.webp,pro_vang_4_b563f466f4a14e3c960a41b3e99d518d.webp}	355000	23	2023-06-01 12:21:35.646946+07	2023-06-24 14:47:43.897916+07	\N
98	11	14	2	shor857918mwhe	pro_vang_1_edcb32beac004d5d85a5c2c2a1d389b1.webp	{pro_vang_1_edcb32beac004d5d85a5c2c2a1d389b1.webp,pro_vang_2_365d5999497e4e5b8984f5471bf42b92.webp,pro_vang_3_469366c9119d4e87853d5ca1601c8386.webp,pro_vang_4_b563f466f4a14e3c960a41b3e99d518d.webp}	355000	23	2023-06-01 12:21:39.208192+07	2023-06-24 14:47:43.897916+07	\N
99	11	14	3	shor857918lwhe	pro_vang_1_edcb32beac004d5d85a5c2c2a1d389b1.webp	{pro_vang_1_edcb32beac004d5d85a5c2c2a1d389b1.webp,pro_vang_2_365d5999497e4e5b8984f5471bf42b92.webp,pro_vang_3_469366c9119d4e87853d5ca1601c8386.webp,pro_vang_4_b563f466f4a14e3c960a41b3e99d518d.webp}	355000	23	2023-06-01 12:21:41.327198+07	2023-06-24 14:47:43.897916+07	\N
94	11	6	1	shor857918swht	pro_trang_1_768741c645e64953b82e64d8c7a30383.webp	{pro_trang_1_768741c645e64953b82e64d8c7a30383.webp,pro_trang_2_13c2f56ed0784f14924281c7673be35b.webp,pro_trang_3_30a049f28d59479fafd2c5df6aaa6c2e.webp,pro_trang_4_c7a239812847493080af9b99493c840f.webp}	355000	23	2023-06-01 12:16:19.10374+07	2023-06-24 14:47:43.897916+07	\N
95	11	6	2	shor857918mwht	pro_trang_1_768741c645e64953b82e64d8c7a30383.webp	{pro_trang_1_768741c645e64953b82e64d8c7a30383.webp,pro_trang_2_13c2f56ed0784f14924281c7673be35b.webp,pro_trang_3_30a049f28d59479fafd2c5df6aaa6c2e.webp,pro_trang_4_c7a239812847493080af9b99493c840f.webp}	355000	23	2023-06-01 12:16:22.683895+07	2023-06-24 14:47:43.897916+07	\N
96	11	6	3	shor857918lwht	pro_trang_1_768741c645e64953b82e64d8c7a30383.webp	{pro_trang_1_768741c645e64953b82e64d8c7a30383.webp,pro_trang_2_13c2f56ed0784f14924281c7673be35b.webp,pro_trang_3_30a049f28d59479fafd2c5df6aaa6c2e.webp,pro_trang_4_c7a239812847493080af9b99493c840f.webp}	355000	22	2023-06-01 12:20:27.838763+07	2023-06-24 14:47:43.897916+07	\N
100	11	12	1	shor857918slblu	pro_xanh_duong_1_0a4ca1149c6847f0b182b108b2c84b62.webp	{pro_xanh_duong_1_0a4ca1149c6847f0b182b108b2c84b62.webp,pro_xanh_duong_2_7a51f2fa10584c2a9d0727acd5101b6d.webp,pro_xanh_duong_3_03506cc3bcb34ce0a5258a409532f78e.webp,pro_xanh_duong_4_8a8a62f65f254bf39caafbe8653a16e2.webp}	355000	24	2023-06-01 12:24:15.254183+07	2023-06-24 14:47:43.897916+07	\N
101	11	12	2	shor857918mlblu	pro_xanh_duong_1_0a4ca1149c6847f0b182b108b2c84b62.webp	{pro_xanh_duong_1_0a4ca1149c6847f0b182b108b2c84b62.webp,pro_xanh_duong_2_7a51f2fa10584c2a9d0727acd5101b6d.webp,pro_xanh_duong_3_03506cc3bcb34ce0a5258a409532f78e.webp,pro_xanh_duong_4_8a8a62f65f254bf39caafbe8653a16e2.webp}	355000	24	2023-06-01 12:24:17.302241+07	2023-06-24 14:47:43.897916+07	\N
102	11	12	3	shor857918llblu	pro_xanh_duong_1_0a4ca1149c6847f0b182b108b2c84b62.webp	{pro_xanh_duong_1_0a4ca1149c6847f0b182b108b2c84b62.webp,pro_xanh_duong_2_7a51f2fa10584c2a9d0727acd5101b6d.webp,pro_xanh_duong_3_03506cc3bcb34ce0a5258a409532f78e.webp,pro_xanh_duong_4_8a8a62f65f254bf39caafbe8653a16e2.webp}	355000	5	2023-06-01 12:24:35.933708+07	2023-06-24 14:47:43.897916+07	\N
103	12	8	1	shor714414slpik	pro_hong_nhat_1_e4e2b206298a4cd18521e15382d0c1ca.webp	{pro_hong_nhat_1_e4e2b206298a4cd18521e15382d0c1ca.webp,pro_hong_nhat_2_d1bceb80820d45f1bff1a3c05159e066.webp,pro_hong_nhat_3_fb4904fbbe4e4ebfb48f689698ee84fa.webp,pro_hong_nhat_4_5d5baeb3eb8840df8f58d9a09817a894.webp}	355000	16	2023-06-01 12:27:05.411904+07	2023-06-24 14:47:43.897916+07	\N
104	12	8	2	shor714414mlpik	pro_hong_nhat_1_e4e2b206298a4cd18521e15382d0c1ca.webp	{pro_hong_nhat_1_e4e2b206298a4cd18521e15382d0c1ca.webp,pro_hong_nhat_2_d1bceb80820d45f1bff1a3c05159e066.webp,pro_hong_nhat_3_fb4904fbbe4e4ebfb48f689698ee84fa.webp,pro_hong_nhat_4_5d5baeb3eb8840df8f58d9a09817a894.webp}	355000	16	2023-06-01 12:27:07.962658+07	2023-06-24 14:47:43.897916+07	\N
105	12	8	3	shor714414llpik	pro_hong_nhat_1_e4e2b206298a4cd18521e15382d0c1ca.webp	{pro_hong_nhat_1_e4e2b206298a4cd18521e15382d0c1ca.webp,pro_hong_nhat_2_d1bceb80820d45f1bff1a3c05159e066.webp,pro_hong_nhat_3_fb4904fbbe4e4ebfb48f689698ee84fa.webp,pro_hong_nhat_4_5d5baeb3eb8840df8f58d9a09817a894.webp}	355000	16	2023-06-01 12:27:10.351706+07	2023-06-24 14:47:43.897916+07	\N
106	12	2	1	shor714414sblk	pro_den_1_ec054210153842e093559227129368bf.webp	{pro_den_1_ec054210153842e093559227129368bf.webp,pro_den_2_873948e271d644fe9248b17ef3d90209.webp,pro_den_3_a587aa88eb7c406b819e2a077e0667e8.webp,pro_den_4_ead0a36bf04c4247b99b9351b1eaa256.webp}	355000	27	2023-06-01 12:27:24.851257+07	2023-06-24 14:47:43.897916+07	\N
107	12	2	2	shor714414mblk	pro_den_1_ec054210153842e093559227129368bf.webp	{pro_den_1_ec054210153842e093559227129368bf.webp,pro_den_2_873948e271d644fe9248b17ef3d90209.webp,pro_den_3_a587aa88eb7c406b819e2a077e0667e8.webp,pro_den_4_ead0a36bf04c4247b99b9351b1eaa256.webp}	355000	22	2023-06-01 12:27:33.660407+07	2023-06-24 14:47:43.897916+07	\N
108	12	2	3	shor714414lblk	pro_den_1_ec054210153842e093559227129368bf.webp	{pro_den_1_ec054210153842e093559227129368bf.webp,pro_den_2_873948e271d644fe9248b17ef3d90209.webp,pro_den_3_a587aa88eb7c406b819e2a077e0667e8.webp,pro_den_4_ead0a36bf04c4247b99b9351b1eaa256.webp}	355000	24	2023-06-01 12:27:38.290314+07	2023-06-24 14:47:43.897916+07	\N
109	13	9	1	shor196424sjgre	pro_xanh_la_1_62220daba38043cb9a8472e15d9f1710.webp	{pro_xanh_la_1_62220daba38043cb9a8472e15d9f1710.webp,pro_xanh_la_2_a8f2a5d3edc148ba8932b5e009e96f4e.webp,pro_xanh_la_3_cd62e481aca248b896a645e1d3ae0603.webp,pro_xanh_la_4_23117bfc3ed0419fb5ab4c527156604b.webp}	355000	24	2023-06-01 14:17:08.949251+07	2023-06-24 14:47:43.897916+07	\N
110	13	9	2	shor196424mjgre	pro_xanh_la_1_62220daba38043cb9a8472e15d9f1710.webp	{pro_xanh_la_1_62220daba38043cb9a8472e15d9f1710.webp,pro_xanh_la_2_a8f2a5d3edc148ba8932b5e009e96f4e.webp,pro_xanh_la_3_cd62e481aca248b896a645e1d3ae0603.webp,pro_xanh_la_4_23117bfc3ed0419fb5ab4c527156604b.webp}	355000	5	2023-06-01 14:17:12.857603+07	2023-06-24 14:47:43.897916+07	\N
111	13	9	3	shor196424ljgre	pro_xanh_la_1_62220daba38043cb9a8472e15d9f1710.webp	{pro_xanh_la_1_62220daba38043cb9a8472e15d9f1710.webp,pro_xanh_la_2_a8f2a5d3edc148ba8932b5e009e96f4e.webp,pro_xanh_la_3_cd62e481aca248b896a645e1d3ae0603.webp,pro_xanh_la_4_23117bfc3ed0419fb5ab4c527156604b.webp}	355000	8	2023-06-01 14:17:18.057432+07	2023-06-24 14:47:43.897916+07	\N
112	13	2	1	shor196424sblk	pro_den_1_15090284571f408d971aa2f676d44630.webp	{pro_den_1_15090284571f408d971aa2f676d44630.webp,pro_den_2_2be82e0615e642d6897ea7aef0607f60.webp,pro_den_3_863ca527170d4e4b89d61069d0805a75.webp,pro_den_4_320930750db24870ac586bc504999b27.webp}	355000	8	2023-06-01 14:19:56.789276+07	2023-06-24 14:47:43.897916+07	\N
113	13	2	2	shor196424mblk	pro_den_1_15090284571f408d971aa2f676d44630.webp	{pro_den_1_15090284571f408d971aa2f676d44630.webp,pro_den_2_2be82e0615e642d6897ea7aef0607f60.webp,pro_den_3_863ca527170d4e4b89d61069d0805a75.webp,pro_den_4_320930750db24870ac586bc504999b27.webp}	355000	8	2023-06-01 14:19:59.958393+07	2023-06-24 14:47:43.897916+07	\N
114	13	2	3	shor196424lblk	pro_den_1_15090284571f408d971aa2f676d44630.webp	{pro_den_1_15090284571f408d971aa2f676d44630.webp,pro_den_2_2be82e0615e642d6897ea7aef0607f60.webp,pro_den_3_863ca527170d4e4b89d61069d0805a75.webp,pro_den_4_320930750db24870ac586bc504999b27.webp}	355000	8	2023-06-01 14:20:02.519238+07	2023-06-24 14:47:43.897916+07	\N
115	13	10	1	shor196424slipik	pro_hong_dam_1_46675a71dfe84facb8ffe9930fcba1c1.webp	{pro_hong_dam_1_46675a71dfe84facb8ffe9930fcba1c1.webp,pro_hong_dam_2_39c9029bdf774ab683ea57d38af5bd69.webp,pro_hong_dam_3_8a0ef2c6ee9a451ebbeb50d1b889dcf7.webp,"pro_hong_dam_4_19ffa3d57f934162bb51a535f027f575 (1).webp"}	355000	8	2023-06-01 14:20:22.960626+07	2023-06-24 14:47:43.897916+07	\N
116	13	10	2	shor196424mlipik	pro_hong_dam_1_46675a71dfe84facb8ffe9930fcba1c1.webp	{pro_hong_dam_1_46675a71dfe84facb8ffe9930fcba1c1.webp,pro_hong_dam_2_39c9029bdf774ab683ea57d38af5bd69.webp,pro_hong_dam_3_8a0ef2c6ee9a451ebbeb50d1b889dcf7.webp,"pro_hong_dam_4_19ffa3d57f934162bb51a535f027f575 (1).webp"}	355000	8	2023-06-01 14:20:28.008187+07	2023-06-24 14:47:43.897916+07	\N
117	13	10	3	shor196424llipik	pro_hong_dam_1_46675a71dfe84facb8ffe9930fcba1c1.webp	{pro_hong_dam_1_46675a71dfe84facb8ffe9930fcba1c1.webp,pro_hong_dam_2_39c9029bdf774ab683ea57d38af5bd69.webp,pro_hong_dam_3_8a0ef2c6ee9a451ebbeb50d1b889dcf7.webp,"pro_hong_dam_4_19ffa3d57f934162bb51a535f027f575 (1).webp"}	355000	12	2023-06-01 14:20:31.687411+07	2023-06-24 14:47:43.897916+07	\N
120	14	15	3	shor811553ldred	pro_do_1_b220adb163394bfcb34b2de97ef7bf73.webp	{pro_do_1_b220adb163394bfcb34b2de97ef7bf73.webp,pro_do_2_c6574b2c125c4697a2f14d880664dd30.webp,pro_do_3_ab1be5ee30424abf9a0828c241d9f497.webp,pro_do_4_650c405933a9419fbe64098545dcf7c3.webp}	355000	14	2023-06-01 14:26:49.438525+07	2023-06-24 14:47:43.897916+07	\N
119	14	15	2	shor811553mdred	pro_do_1_b220adb163394bfcb34b2de97ef7bf73.webp	{pro_do_1_b220adb163394bfcb34b2de97ef7bf73.webp,pro_do_2_c6574b2c125c4697a2f14d880664dd30.webp,pro_do_3_ab1be5ee30424abf9a0828c241d9f497.webp,pro_do_4_650c405933a9419fbe64098545dcf7c3.webp}	355000	14	2023-06-01 14:26:35.307492+07	2023-06-24 14:47:43.897916+07	\N
118	14	15	1	shor811553sdred	pro_do_1_b220adb163394bfcb34b2de97ef7bf73.webp	{pro_do_1_b220adb163394bfcb34b2de97ef7bf73.webp,pro_do_2_c6574b2c125c4697a2f14d880664dd30.webp,pro_do_3_ab1be5ee30424abf9a0828c241d9f497.webp,pro_do_4_650c405933a9419fbe64098545dcf7c3.webp}	355000	14	2023-06-01 14:26:23.807692+07	2023-06-24 14:47:43.897916+07	\N
121	14	2	1	shor811553sblk	pro_den_1_420cbe8bfa1e4ebcbd1dd304c4816d78.webp	{pro_den_1_420cbe8bfa1e4ebcbd1dd304c4816d78.webp,pro_den_2_fd46a755516d4c9b9c9c931c51807bc1.webp,pro_den_3_d78c3b272e144102a5a49be93b5e97d8.webp,pro_den_4_634b5478d75f43e0a78210a8d267817d.webp}	355000	14	2023-06-01 14:27:12.519621+07	2023-06-24 14:47:43.897916+07	\N
122	14	2	2	shor811553mblk	pro_den_1_420cbe8bfa1e4ebcbd1dd304c4816d78.webp	{pro_den_1_420cbe8bfa1e4ebcbd1dd304c4816d78.webp,pro_den_2_fd46a755516d4c9b9c9c931c51807bc1.webp,pro_den_3_d78c3b272e144102a5a49be93b5e97d8.webp,pro_den_4_634b5478d75f43e0a78210a8d267817d.webp}	355000	14	2023-06-01 14:35:44.815102+07	2023-06-24 14:47:43.897916+07	\N
123	14	2	3	shor811553lblk	pro_den_1_420cbe8bfa1e4ebcbd1dd304c4816d78.webp	{pro_den_1_420cbe8bfa1e4ebcbd1dd304c4816d78.webp,pro_den_2_fd46a755516d4c9b9c9c931c51807bc1.webp,pro_den_3_d78c3b272e144102a5a49be93b5e97d8.webp,pro_den_4_634b5478d75f43e0a78210a8d267817d.webp}	355000	6	2023-06-01 14:35:48.851917+07	2023-06-24 14:47:43.897916+07	\N
124	14	10	1	shor811553slipik	pro_hong_dam_1_12e55d4b9d6f4796ad6f42b6f708eb82.webp	{pro_hong_dam_1_12e55d4b9d6f4796ad6f42b6f708eb82.webp,pro_hong_dam_3_da5d1445cb7a492395efa5619d8095af.webp,pro_hong_dam_4_d48ead527468402cadaeaac036004469.webp,pro_hong_dam_5_a31b0bfcef204f4393b4a16a0ced685a.webp}	355000	6	2023-06-01 14:37:02.230281+07	2023-06-24 14:47:43.897916+07	\N
125	14	10	2	shor811553mlipik	pro_hong_dam_1_12e55d4b9d6f4796ad6f42b6f708eb82.webp	{pro_hong_dam_1_12e55d4b9d6f4796ad6f42b6f708eb82.webp,pro_hong_dam_3_da5d1445cb7a492395efa5619d8095af.webp,pro_hong_dam_4_d48ead527468402cadaeaac036004469.webp,pro_hong_dam_5_a31b0bfcef204f4393b4a16a0ced685a.webp}	355000	6	2023-06-01 14:37:05.95104+07	2023-06-24 14:47:43.897916+07	\N
126	14	10	3	shor811553llipik	pro_hong_dam_1_12e55d4b9d6f4796ad6f42b6f708eb82.webp	{pro_hong_dam_1_12e55d4b9d6f4796ad6f42b6f708eb82.webp,pro_hong_dam_3_da5d1445cb7a492395efa5619d8095af.webp,pro_hong_dam_4_d48ead527468402cadaeaac036004469.webp,pro_hong_dam_5_a31b0bfcef204f4393b4a16a0ced685a.webp}	355000	7	2023-06-01 14:37:10.202656+07	2023-06-24 14:47:43.897916+07	\N
127	15	3	1	shor276930sblue	pro_xanh_duong_dam_1_cfc34b548b1247a4935e88c1d276dbc6.webp	{pro_xanh_duong_dam_1_cfc34b548b1247a4935e88c1d276dbc6.webp,pro_xanh_duong_dam_2_3da4ccb838fe45f194c12209bc5e1b3f.webp,pro_xanh_duong_dam_3_2ea01dd93a9c46c0a32e67872af38d3a.webp,pro_xanh_duong_dam_4_c4c7e9c9f6e7419e8e1d8b65405b6841.webp}	355000	7	2023-06-01 14:40:40.930411+07	2023-06-24 14:47:43.897916+07	\N
128	15	3	2	shor276930mblue	pro_xanh_duong_dam_1_cfc34b548b1247a4935e88c1d276dbc6.webp	{pro_xanh_duong_dam_1_cfc34b548b1247a4935e88c1d276dbc6.webp,pro_xanh_duong_dam_2_3da4ccb838fe45f194c12209bc5e1b3f.webp,pro_xanh_duong_dam_3_2ea01dd93a9c46c0a32e67872af38d3a.webp,pro_xanh_duong_dam_4_c4c7e9c9f6e7419e8e1d8b65405b6841.webp}	355000	7	2023-06-01 14:40:44.097799+07	2023-06-24 14:47:43.897916+07	\N
129	15	3	3	shor276930lblue	pro_xanh_duong_dam_1_cfc34b548b1247a4935e88c1d276dbc6.webp	{pro_xanh_duong_dam_1_cfc34b548b1247a4935e88c1d276dbc6.webp,pro_xanh_duong_dam_2_3da4ccb838fe45f194c12209bc5e1b3f.webp,pro_xanh_duong_dam_3_2ea01dd93a9c46c0a32e67872af38d3a.webp,pro_xanh_duong_dam_4_c4c7e9c9f6e7419e8e1d8b65405b6841.webp}	355000	5	2023-06-01 14:40:48.648832+07	2023-06-24 14:47:43.897916+07	\N
130	15	5	1	shor276930sbro	pro_nau_dam_1_1ca0254a11a1498d86a3ca87a0e855e4.webp	{pro_nau_dam_1_1ca0254a11a1498d86a3ca87a0e855e4.webp,pro_nau_dam_2_035ef215f861438ebb0a32cf86c853f0.webp,pro_nau_dam_3_44b2401f9c874f13b13445fdeec51c1f.webp,pro_nau_dam_4_2fe41cc41b3e47b8a398780e19fa9ebb.webp}	355000	5	2023-06-01 14:41:23.878423+07	2023-06-24 14:47:43.897916+07	\N
132	15	5	3	shor276930lbro	pro_nau_dam_1_1ca0254a11a1498d86a3ca87a0e855e4.webp	{pro_nau_dam_1_1ca0254a11a1498d86a3ca87a0e855e4.webp,pro_nau_dam_2_035ef215f861438ebb0a32cf86c853f0.webp,pro_nau_dam_3_44b2401f9c874f13b13445fdeec51c1f.webp,pro_nau_dam_4_2fe41cc41b3e47b8a398780e19fa9ebb.webp}	355000	14	2023-06-01 14:41:32.888742+07	2023-06-24 14:47:43.897916+07	\N
134	16	2	2	skir604842mblk	pro_den_1_43ddb1fc51704d0e89fdc679fcc30c05.webp	{pro_den_1_43ddb1fc51704d0e89fdc679fcc30c05.webp,pro_den_2_6685af05031545dc83c84695024a8f45.webp,pro_den_3_f8a70108885f428096c5714bc106ddd4.webp,pro_den_4_c8d5040064064d4796361a2022b31866.webp}	355000	15	2023-06-01 14:52:28.91621+07	2023-06-24 14:47:43.897916+07	\N
135	16	2	3	skir604842lblk	pro_den_1_43ddb1fc51704d0e89fdc679fcc30c05.webp	{pro_den_1_43ddb1fc51704d0e89fdc679fcc30c05.webp,pro_den_2_6685af05031545dc83c84695024a8f45.webp,pro_den_3_f8a70108885f428096c5714bc106ddd4.webp,pro_den_4_c8d5040064064d4796361a2022b31866.webp}	355000	37	2023-06-01 14:52:35.564397+07	2023-06-24 14:47:43.897916+07	\N
136	16	11	1	skir604842svani	pro_da_1_3957b7f0f2c141baad6cbbc83817022e.webp	{pro_da_1_3957b7f0f2c141baad6cbbc83817022e.webp,pro_da_2_42a4e05f00cf4441b221f21b93dcb6bc.webp,pro_da_3_ccb40409b12c402bb7507d38397d81c5.webp,pro_da_4_cc44388650a74af4a7ec93ae71d24901.webp}	355000	37	2023-06-01 14:53:16.862989+07	2023-06-24 14:47:43.897916+07	\N
137	16	11	2	skir604842mvani	pro_da_1_3957b7f0f2c141baad6cbbc83817022e.webp	{pro_da_1_3957b7f0f2c141baad6cbbc83817022e.webp,pro_da_2_42a4e05f00cf4441b221f21b93dcb6bc.webp,pro_da_3_ccb40409b12c402bb7507d38397d81c5.webp,pro_da_4_cc44388650a74af4a7ec93ae71d24901.webp}	355000	37	2023-06-01 14:53:19.042925+07	2023-06-24 14:47:43.897916+07	\N
138	16	11	3	skir604842lvani	pro_da_1_3957b7f0f2c141baad6cbbc83817022e.webp	{pro_da_1_3957b7f0f2c141baad6cbbc83817022e.webp,pro_da_2_42a4e05f00cf4441b221f21b93dcb6bc.webp,pro_da_3_ccb40409b12c402bb7507d38397d81c5.webp,pro_da_4_cc44388650a74af4a7ec93ae71d24901.webp}	355000	37	2023-06-01 14:53:20.786352+07	2023-06-24 14:47:43.897916+07	\N
139	16	6	1	skir604842swht	pro_trang_1_bc6ba99a44dc47669d860ac8a39cf8a2.webp	{pro_trang_1_bc6ba99a44dc47669d860ac8a39cf8a2.webp,pro_trang_2_375c9506f50c4bafaf9236405bc471e0.webp,pro_trang_3_6375e2e63ce147c3b2f7667ea9f01f6a.webp,pro_trang_4_53eacabf8cd145bb810904a1db941850.webp}	355000	37	2023-06-01 14:53:41.162413+07	2023-06-24 14:47:43.897916+07	\N
140	16	6	2	skir604842mwht	pro_trang_1_bc6ba99a44dc47669d860ac8a39cf8a2.webp	{pro_trang_1_bc6ba99a44dc47669d860ac8a39cf8a2.webp,pro_trang_2_375c9506f50c4bafaf9236405bc471e0.webp,pro_trang_3_6375e2e63ce147c3b2f7667ea9f01f6a.webp,pro_trang_4_53eacabf8cd145bb810904a1db941850.webp}	355000	37	2023-06-01 14:53:43.872334+07	2023-06-24 14:47:43.897916+07	\N
141	16	6	3	skir604842lwht	pro_trang_1_bc6ba99a44dc47669d860ac8a39cf8a2.webp	{pro_trang_1_bc6ba99a44dc47669d860ac8a39cf8a2.webp,pro_trang_2_375c9506f50c4bafaf9236405bc471e0.webp,pro_trang_3_6375e2e63ce147c3b2f7667ea9f01f6a.webp,pro_trang_4_53eacabf8cd145bb810904a1db941850.webp}	355000	37	2023-06-01 14:53:45.403083+07	2023-06-24 14:47:43.897916+07	\N
142	17	11	1	skir259029svani	pro_kem_1_be51ceb5bdda418ca5863919bd5d04b1.webp	{pro_kem_1_be51ceb5bdda418ca5863919bd5d04b1.webp,pro_kem_2_adca57fbb23b4ed8bce672f698044e07.webp,pro_kem_3_f92198335d2543d48b2a2cc72547e674.webp,pro_kem_4_01ecc513ca144414999ce6d6915092e0.webp}	355000	37	2023-06-01 14:58:27.034462+07	2023-06-24 14:47:43.897916+07	\N
143	17	11	2	skir259029mvani	pro_kem_1_be51ceb5bdda418ca5863919bd5d04b1.webp	{pro_kem_1_be51ceb5bdda418ca5863919bd5d04b1.webp,pro_kem_2_adca57fbb23b4ed8bce672f698044e07.webp,pro_kem_3_f92198335d2543d48b2a2cc72547e674.webp,pro_kem_4_01ecc513ca144414999ce6d6915092e0.webp}	355000	16	2023-06-01 14:58:31.504026+07	2023-06-24 14:47:43.897916+07	\N
144	17	11	3	skir259029lvani	pro_kem_1_be51ceb5bdda418ca5863919bd5d04b1.webp	{pro_kem_1_be51ceb5bdda418ca5863919bd5d04b1.webp,pro_kem_2_adca57fbb23b4ed8bce672f698044e07.webp,pro_kem_3_f92198335d2543d48b2a2cc72547e674.webp,pro_kem_4_01ecc513ca144414999ce6d6915092e0.webp}	355000	16	2023-06-01 14:58:33.692029+07	2023-06-24 14:47:43.897916+07	\N
145	17	10	1	skir259029slipik	pro_hong_nhat_1_6b55d85d89534c8786a641a5187eb45c.webp	{pro_hong_nhat_1_6b55d85d89534c8786a641a5187eb45c.webp,pro_hong_nhat_2_fab57796532b4c68bf1a241018f70ed9.webp,pro_hong_nhat_3_9e5c723f7bdf4e2da07d1d3428820b52.webp,pro_hong_nhat_4_883d608a14ef4f7d95c436e7252136a1.webp}	355000	16	2023-06-01 14:58:59.611938+07	2023-06-24 14:47:43.897916+07	\N
146	17	10	2	skir259029mlipik	pro_hong_nhat_1_6b55d85d89534c8786a641a5187eb45c.webp	{pro_hong_nhat_1_6b55d85d89534c8786a641a5187eb45c.webp,pro_hong_nhat_2_fab57796532b4c68bf1a241018f70ed9.webp,pro_hong_nhat_3_9e5c723f7bdf4e2da07d1d3428820b52.webp,pro_hong_nhat_4_883d608a14ef4f7d95c436e7252136a1.webp}	355000	16	2023-06-01 14:59:01.416229+07	2023-06-24 14:47:43.897916+07	\N
147	17	10	3	skir259029llipik	pro_hong_nhat_1_6b55d85d89534c8786a641a5187eb45c.webp	{pro_hong_nhat_1_6b55d85d89534c8786a641a5187eb45c.webp,pro_hong_nhat_2_fab57796532b4c68bf1a241018f70ed9.webp,pro_hong_nhat_3_9e5c723f7bdf4e2da07d1d3428820b52.webp,pro_hong_nhat_4_883d608a14ef4f7d95c436e7252136a1.webp}	355000	24	2023-06-01 14:59:05.071985+07	2023-06-24 14:47:43.897916+07	\N
148	17	7	1	skir259029slgre	pro_xanh_la_nhat_1_ad88dbb68eb24ab98b43139123a86a4c.webp	{pro_xanh_la_nhat_1_ad88dbb68eb24ab98b43139123a86a4c.webp,pro_xanh_la_nhat_2_5bad3663a9164416894b239db19bb176.webp,pro_xanh_la_nhat_3_fedcd32765dd48d89f793b48cb5f709c.webp,pro_xanh_la_nhat_4_96f0bec58a7342efb007ade1921a7b99.webp}	355000	24	2023-06-01 14:59:26.174628+07	2023-06-24 14:47:43.897916+07	\N
149	17	7	2	skir259029mlgre	pro_xanh_la_nhat_1_ad88dbb68eb24ab98b43139123a86a4c.webp	{pro_xanh_la_nhat_1_ad88dbb68eb24ab98b43139123a86a4c.webp,pro_xanh_la_nhat_2_5bad3663a9164416894b239db19bb176.webp,pro_xanh_la_nhat_3_fedcd32765dd48d89f793b48cb5f709c.webp,pro_xanh_la_nhat_4_96f0bec58a7342efb007ade1921a7b99.webp}	355000	16	2023-06-01 14:59:30.183793+07	2023-06-24 14:47:43.897916+07	\N
150	17	7	3	skir259029llgre	pro_xanh_la_nhat_1_ad88dbb68eb24ab98b43139123a86a4c.webp	{pro_xanh_la_nhat_1_ad88dbb68eb24ab98b43139123a86a4c.webp,pro_xanh_la_nhat_2_5bad3663a9164416894b239db19bb176.webp,pro_xanh_la_nhat_3_fedcd32765dd48d89f793b48cb5f709c.webp,pro_xanh_la_nhat_4_96f0bec58a7342efb007ade1921a7b99.webp}	355000	27	2023-06-01 14:59:33.843748+07	2023-06-24 14:47:43.897916+07	\N
151	18	2	1	skir582078sblk	pro_den_1_e0b15828a3614dc5ac2b306c7336f3ac.webp	{pro_den_1_e0b15828a3614dc5ac2b306c7336f3ac.webp,pro_den_2_62c07ea271e44c31aa6a4f48509ad6c2.webp,pro_den_3_d2ae4e34f24242099249451ce08d5850.webp,pro_den_4_781f652ed2e348d18910f1ba83af6c31.webp}	495000	27	2023-06-01 15:14:22.568872+07	2023-06-24 14:47:43.897916+07	\N
152	18	2	2	skir582078mblk	pro_den_1_e0b15828a3614dc5ac2b306c7336f3ac.webp	{pro_den_1_e0b15828a3614dc5ac2b306c7336f3ac.webp,pro_den_2_62c07ea271e44c31aa6a4f48509ad6c2.webp,pro_den_3_d2ae4e34f24242099249451ce08d5850.webp,pro_den_4_781f652ed2e348d18910f1ba83af6c31.webp}	495000	14	2023-06-01 15:14:27.818633+07	2023-06-24 14:47:43.897916+07	\N
153	18	2	3	skir582078lblk	pro_den_1_e0b15828a3614dc5ac2b306c7336f3ac.webp	{pro_den_1_e0b15828a3614dc5ac2b306c7336f3ac.webp,pro_den_2_62c07ea271e44c31aa6a4f48509ad6c2.webp,pro_den_3_d2ae4e34f24242099249451ce08d5850.webp,pro_den_4_781f652ed2e348d18910f1ba83af6c31.webp}	495000	14	2023-06-01 15:14:30.109582+07	2023-06-24 14:47:43.897916+07	\N
154	18	5	1	skir582078sbro	pro_nau_1_ed37e68491cf45b58a993386695f1f8d.webp	{pro_nau_1_ed37e68491cf45b58a993386695f1f8d.webp,pro_nau_2_fb2fb96bc82b4fac826bbb8efef6580b.webp,pro_nau_3_e6e674b5e879450eb8002507bcc0ef98.webp,pro_nau_4_8524816796cc4e02ab346b80685d0132.webp}	495000	14	2023-06-01 15:14:42.830378+07	2023-06-24 14:47:43.897916+07	\N
155	18	5	2	skir582078mbro	pro_nau_1_ed37e68491cf45b58a993386695f1f8d.webp	{pro_nau_1_ed37e68491cf45b58a993386695f1f8d.webp,pro_nau_2_fb2fb96bc82b4fac826bbb8efef6580b.webp,pro_nau_3_e6e674b5e879450eb8002507bcc0ef98.webp,pro_nau_4_8524816796cc4e02ab346b80685d0132.webp}	495000	14	2023-06-01 15:14:44.66983+07	2023-06-24 14:47:43.897916+07	\N
156	18	5	3	skir582078lbro	pro_nau_1_ed37e68491cf45b58a993386695f1f8d.webp	{pro_nau_1_ed37e68491cf45b58a993386695f1f8d.webp,pro_nau_2_fb2fb96bc82b4fac826bbb8efef6580b.webp,pro_nau_3_e6e674b5e879450eb8002507bcc0ef98.webp,pro_nau_4_8524816796cc4e02ab346b80685d0132.webp}	495000	10	2023-06-01 15:14:49.404615+07	2023-06-24 14:47:43.897916+07	\N
157	19	9	1	skir616726sjgre	pro_xanh_la_1_87f56f3ac67240048380e32cdbd99a50.webp	{pro_xanh_la_1_87f56f3ac67240048380e32cdbd99a50.webp,pro_xanh_la_2_0e7c8fa09ade4bdaba5b2219983e8099.webp,pro_xanh_la_4_5a4cdbea0ffe403e8595945ed61369cd.webp,pro_xanh_la_6_f9ab648d98e74760bc9a069ade0d79cc.webp}	655000	10	2023-06-01 15:18:42.66878+07	2023-06-24 14:47:43.897916+07	\N
158	19	9	2	skir616726mjgre	pro_xanh_la_1_87f56f3ac67240048380e32cdbd99a50.webp	{pro_xanh_la_1_87f56f3ac67240048380e32cdbd99a50.webp,pro_xanh_la_2_0e7c8fa09ade4bdaba5b2219983e8099.webp,pro_xanh_la_4_5a4cdbea0ffe403e8595945ed61369cd.webp,pro_xanh_la_6_f9ab648d98e74760bc9a069ade0d79cc.webp}	655000	10	2023-06-01 15:18:45.288023+07	2023-06-24 14:47:43.897916+07	\N
159	19	9	3	skir616726ljgre	pro_xanh_la_1_87f56f3ac67240048380e32cdbd99a50.webp	{pro_xanh_la_1_87f56f3ac67240048380e32cdbd99a50.webp,pro_xanh_la_2_0e7c8fa09ade4bdaba5b2219983e8099.webp,pro_xanh_la_4_5a4cdbea0ffe403e8595945ed61369cd.webp,pro_xanh_la_6_f9ab648d98e74760bc9a069ade0d79cc.webp}	655000	10	2023-06-01 15:18:47.177704+07	2023-06-24 14:47:43.897916+07	\N
160	19	10	1	skir616726slipik	pro_hong_1_50d247071b1f4b55b8d8f814e93dd8f7.webp	{pro_hong_1_50d247071b1f4b55b8d8f814e93dd8f7.webp,pro_hong_2_b9f54b3d00114659b3971d1dcd988aa3.webp,pro_hong_4_bb8d89c08cfd4ee7bd96c4ef860cde26.webp,pro_hong_6_c6cf4c51cdb049b8b481b0fcafc8171e.webp}	655000	10	2023-06-01 15:19:30.518418+07	2023-06-24 14:47:43.897916+07	\N
161	19	10	2	skir616726mlipik	pro_hong_1_50d247071b1f4b55b8d8f814e93dd8f7.webp	{pro_hong_1_50d247071b1f4b55b8d8f814e93dd8f7.webp,pro_hong_2_b9f54b3d00114659b3971d1dcd988aa3.webp,pro_hong_4_bb8d89c08cfd4ee7bd96c4ef860cde26.webp,pro_hong_6_c6cf4c51cdb049b8b481b0fcafc8171e.webp}	655000	10	2023-06-01 15:19:35.196179+07	2023-06-24 14:47:43.897916+07	\N
162	19	10	3	skir616726llipik	pro_hong_1_50d247071b1f4b55b8d8f814e93dd8f7.webp	{pro_hong_1_50d247071b1f4b55b8d8f814e93dd8f7.webp,pro_hong_2_b9f54b3d00114659b3971d1dcd988aa3.webp,pro_hong_4_bb8d89c08cfd4ee7bd96c4ef860cde26.webp,pro_hong_6_c6cf4c51cdb049b8b481b0fcafc8171e.webp}	655000	5	2023-06-01 15:19:39.457708+07	2023-06-24 14:47:43.897916+07	\N
163	20	14	1	skir345539swhe	pro_nau_1_9d28605672294d8095b1209b94506300.webp	{pro_nau_1_9d28605672294d8095b1209b94506300.webp,pro_nau_2_724d030abe764a6c813b1f27f397489e.webp,pro_nau_3_62eb3476a7e34323b9d4e1b0025054f2.webp,pro_nau_4_a9e6e00fd0a4473c86b68ca084e4fa0b.webp}	355000	5	2023-06-01 15:25:31.387225+07	2023-06-24 14:47:43.897916+07	\N
164	20	14	2	skir345539mwhe	pro_nau_1_9d28605672294d8095b1209b94506300.webp	{pro_nau_1_9d28605672294d8095b1209b94506300.webp,pro_nau_2_724d030abe764a6c813b1f27f397489e.webp,pro_nau_3_62eb3476a7e34323b9d4e1b0025054f2.webp,pro_nau_4_a9e6e00fd0a4473c86b68ca084e4fa0b.webp}	355000	5	2023-06-01 15:25:34.745599+07	2023-06-24 14:47:43.897916+07	\N
165	20	14	3	skir345539lwhe	pro_nau_1_9d28605672294d8095b1209b94506300.webp	{pro_nau_1_9d28605672294d8095b1209b94506300.webp,pro_nau_2_724d030abe764a6c813b1f27f397489e.webp,pro_nau_3_62eb3476a7e34323b9d4e1b0025054f2.webp,pro_nau_4_a9e6e00fd0a4473c86b68ca084e4fa0b.webp}	355000	5	2023-06-01 15:25:36.51568+07	2023-06-24 14:47:43.897916+07	\N
166	20	15	1	skir345539sdred	pro_do_1_c4c4584714a2450eb3e5e4555d8809e1.webp	{pro_do_1_c4c4584714a2450eb3e5e4555d8809e1.webp,pro_do_2_a461501752bc406fa0169eb4ea82bf37.webp,pro_do_3_95c6ab70d59d4440b3a4af39fb78ab6d.webp,pro_do_4_23b597d5cba94d89834bfdac79d283d1.webp}	355000	5	2023-06-01 15:25:48.165817+07	2023-06-24 14:47:43.897916+07	\N
167	20	15	2	skir345539mdred	pro_do_1_c4c4584714a2450eb3e5e4555d8809e1.webp	{pro_do_1_c4c4584714a2450eb3e5e4555d8809e1.webp,pro_do_2_a461501752bc406fa0169eb4ea82bf37.webp,pro_do_3_95c6ab70d59d4440b3a4af39fb78ab6d.webp,pro_do_4_23b597d5cba94d89834bfdac79d283d1.webp}	355000	5	2023-06-01 15:25:50.945668+07	2023-06-24 14:47:43.897916+07	\N
168	20	15	3	skir345539ldred	pro_do_1_c4c4584714a2450eb3e5e4555d8809e1.webp	{pro_do_1_c4c4584714a2450eb3e5e4555d8809e1.webp,pro_do_2_a461501752bc406fa0169eb4ea82bf37.webp,pro_do_3_95c6ab70d59d4440b3a4af39fb78ab6d.webp,pro_do_4_23b597d5cba94d89834bfdac79d283d1.webp}	355000	5	2023-06-01 15:25:52.985979+07	2023-06-24 14:47:43.897916+07	\N
169	20	4	1	skir345539sdblu	pro_xanh_den_1_68fff8d210044395bf22117a32b73a8b.webp	{pro_xanh_den_1_68fff8d210044395bf22117a32b73a8b.webp,pro_xanh_den_2_5d0da56a070d48c981d96fd441bb04dc.webp,pro_xanh_den_3_3cebf421583a45fe86ac5b53a8e3fc8c.webp,pro_xanh_den_4_d279e2a25ed0453f9833be55bcc7dea9.webp}	355000	12	2023-06-01 15:26:12.957579+07	2023-06-24 14:47:43.897916+07	\N
170	20	4	2	skir345539mdblu	pro_xanh_den_1_68fff8d210044395bf22117a32b73a8b.webp	{pro_xanh_den_1_68fff8d210044395bf22117a32b73a8b.webp,pro_xanh_den_2_5d0da56a070d48c981d96fd441bb04dc.webp,pro_xanh_den_3_3cebf421583a45fe86ac5b53a8e3fc8c.webp,pro_xanh_den_4_d279e2a25ed0453f9833be55bcc7dea9.webp}	355000	13	2023-06-01 15:26:16.825809+07	2023-06-24 14:47:43.897916+07	\N
171	20	4	3	skir345539ldblu	pro_xanh_den_1_68fff8d210044395bf22117a32b73a8b.webp	{pro_xanh_den_1_68fff8d210044395bf22117a32b73a8b.webp,pro_xanh_den_2_5d0da56a070d48c981d96fd441bb04dc.webp,pro_xanh_den_3_3cebf421583a45fe86ac5b53a8e3fc8c.webp,pro_xanh_den_4_d279e2a25ed0453f9833be55bcc7dea9.webp}	355000	6	2023-06-01 15:26:21.805397+07	2023-06-24 14:47:43.897916+07	\N
172	20	12	1	skir345539slblu	pro_xanh_duong_nhat_1_bbd272cc5eb24122910388497144205b.webp	{pro_xanh_duong_nhat_1_bbd272cc5eb24122910388497144205b.webp,pro_xanh_duong_nhat_2_f0337fbd435d49a49a8dc8a8c5135241.webp,pro_xanh_duong_nhat_3_33c14319b17a465b970fa67446036165.webp,pro_xanh_duong_nhat_4_11402edc17b846499a07c4a4a778c177.webp}	355000	6	2023-06-01 15:26:56.235799+07	2023-06-24 14:47:43.897916+07	\N
173	20	12	2	skir345539mlblu	pro_xanh_duong_nhat_1_bbd272cc5eb24122910388497144205b.webp	{pro_xanh_duong_nhat_1_bbd272cc5eb24122910388497144205b.webp,pro_xanh_duong_nhat_2_f0337fbd435d49a49a8dc8a8c5135241.webp,pro_xanh_duong_nhat_3_33c14319b17a465b970fa67446036165.webp,pro_xanh_duong_nhat_4_11402edc17b846499a07c4a4a778c177.webp}	355000	7	2023-06-01 15:27:02.295229+07	2023-06-24 14:47:43.897916+07	\N
174	20	12	3	skir345539llblu	pro_xanh_duong_nhat_1_bbd272cc5eb24122910388497144205b.webp	{pro_xanh_duong_nhat_1_bbd272cc5eb24122910388497144205b.webp,pro_xanh_duong_nhat_2_f0337fbd435d49a49a8dc8a8c5135241.webp,pro_xanh_duong_nhat_3_33c14319b17a465b970fa67446036165.webp,pro_xanh_duong_nhat_4_11402edc17b846499a07c4a4a778c177.webp}	355000	22	2023-06-01 15:27:05.73523+07	2023-06-24 14:47:43.897916+07	\N
175	21	4	1	skir879366sdblu	pro_xanh_duong_dam_1_c713ded84cca4ba692a79c302e353874.webp	{pro_xanh_duong_dam_1_c713ded84cca4ba692a79c302e353874.webp,pro_xanh_duong_dam_2_5bcfd5ceb92a4782a01dcc274f581dca.webp,pro_xanh_duong_dam_3_41467e93eba140899440bcbe65dc5a36.webp,pro_xanh_duong_dam_4_e3e814427336424f8461aebee0ed9ed1.webp}	655000	22	2023-06-01 15:30:42.143164+07	2023-06-24 14:47:43.897916+07	\N
176	21	4	2	skir879366mdblu	pro_xanh_duong_dam_1_c713ded84cca4ba692a79c302e353874.webp	{pro_xanh_duong_dam_1_c713ded84cca4ba692a79c302e353874.webp,pro_xanh_duong_dam_2_5bcfd5ceb92a4782a01dcc274f581dca.webp,pro_xanh_duong_dam_3_41467e93eba140899440bcbe65dc5a36.webp,pro_xanh_duong_dam_4_e3e814427336424f8461aebee0ed9ed1.webp}	655000	12	2023-06-01 15:30:47.592962+07	2023-06-24 14:47:43.897916+07	\N
177	21	4	3	skir879366ldblu	pro_xanh_duong_dam_1_c713ded84cca4ba692a79c302e353874.webp	{pro_xanh_duong_dam_1_c713ded84cca4ba692a79c302e353874.webp,pro_xanh_duong_dam_2_5bcfd5ceb92a4782a01dcc274f581dca.webp,pro_xanh_duong_dam_3_41467e93eba140899440bcbe65dc5a36.webp,pro_xanh_duong_dam_4_e3e814427336424f8461aebee0ed9ed1.webp}	655000	14	2023-06-01 15:30:51.852418+07	2023-06-24 14:47:43.897916+07	\N
178	22	11	1	dres931470svani	pro_kem_1_e778b45bbbf34a719d4e7a6f26044855.webp	{pro_kem_1_e778b45bbbf34a719d4e7a6f26044855.webp,pro_kem_2_862a5992dcf848ec9beec06d56cd0ce0.webp,pro_kem_3_ce83517da94f4bc3aa4d76dd0658fe08.webp,pro_kem_4_90a1977aed8a43bab1d24dc216c0245d.webp}	495000	27	2023-06-01 15:43:41.689885+07	2023-06-24 14:47:43.897916+07	\N
179	22	11	2	dres931470mvani	pro_kem_1_e778b45bbbf34a719d4e7a6f26044855.webp	{pro_kem_1_e778b45bbbf34a719d4e7a6f26044855.webp,pro_kem_2_862a5992dcf848ec9beec06d56cd0ce0.webp,pro_kem_3_ce83517da94f4bc3aa4d76dd0658fe08.webp,pro_kem_4_90a1977aed8a43bab1d24dc216c0245d.webp}	495000	27	2023-06-01 15:43:44.577564+07	2023-06-24 14:47:43.897916+07	\N
180	22	11	3	dres931470lvani	pro_kem_1_e778b45bbbf34a719d4e7a6f26044855.webp	{pro_kem_1_e778b45bbbf34a719d4e7a6f26044855.webp,pro_kem_2_862a5992dcf848ec9beec06d56cd0ce0.webp,pro_kem_3_ce83517da94f4bc3aa4d76dd0658fe08.webp,pro_kem_4_90a1977aed8a43bab1d24dc216c0245d.webp}	495000	27	2023-06-01 15:44:49.275729+07	2023-06-24 14:47:43.897916+07	\N
181	22	2	1	dres931470sblk	pro_den_1_8bd0c706a4d94712a46fe28ed6ee475e.webp	{pro_den_1_8bd0c706a4d94712a46fe28ed6ee475e.webp,pro_den_2_5e875bebd2ca4b2f961b40f0396057b9.webp,pro_den_3_509fd82f470445ab821c0bfe9cc3ee76.webp,pro_den_4_da84eac0adaa4e0ba19b1905bcd4c841.webp}	495000	27	2023-06-01 15:45:02.846293+07	2023-06-24 14:47:43.897916+07	\N
182	22	2	2	dres931470mblk	pro_den_1_8bd0c706a4d94712a46fe28ed6ee475e.webp	{pro_den_1_8bd0c706a4d94712a46fe28ed6ee475e.webp,pro_den_2_5e875bebd2ca4b2f961b40f0396057b9.webp,pro_den_3_509fd82f470445ab821c0bfe9cc3ee76.webp,pro_den_4_da84eac0adaa4e0ba19b1905bcd4c841.webp}	495000	14	2023-06-01 15:45:09.087088+07	2023-06-24 14:47:43.897916+07	\N
183	22	2	3	dres931470lblk	pro_den_1_8bd0c706a4d94712a46fe28ed6ee475e.webp	{pro_den_1_8bd0c706a4d94712a46fe28ed6ee475e.webp,pro_den_2_5e875bebd2ca4b2f961b40f0396057b9.webp,pro_den_3_509fd82f470445ab821c0bfe9cc3ee76.webp,pro_den_4_da84eac0adaa4e0ba19b1905bcd4c841.webp}	495000	17	2023-06-01 15:45:14.472065+07	2023-06-24 14:47:43.897916+07	\N
184	22	10	1	dres931470slipik	pro_hong_1_3765b3363c2f4f31a6c96e456adb7452.webp	{pro_hong_1_3765b3363c2f4f31a6c96e456adb7452.webp,pro_hong_2_6f73f51621c145cca9859d89f095c2b7.webp,pro_hong_3_4819803724a94cd48550e94851237f96.webp,pro_hong_4_826098d8aa824cc8a5d4a1d704498b9d.webp}	495000	17	2023-06-01 15:45:39.450131+07	2023-06-24 14:47:43.897916+07	\N
185	22	10	2	dres931470mlipik	pro_hong_1_3765b3363c2f4f31a6c96e456adb7452.webp	{pro_hong_1_3765b3363c2f4f31a6c96e456adb7452.webp,pro_hong_2_6f73f51621c145cca9859d89f095c2b7.webp,pro_hong_3_4819803724a94cd48550e94851237f96.webp,pro_hong_4_826098d8aa824cc8a5d4a1d704498b9d.webp}	495000	17	2023-06-01 15:45:42.589853+07	2023-06-24 14:47:43.897916+07	\N
186	22	10	3	dres931470llipik	pro_hong_1_3765b3363c2f4f31a6c96e456adb7452.webp	{pro_hong_1_3765b3363c2f4f31a6c96e456adb7452.webp,pro_hong_2_6f73f51621c145cca9859d89f095c2b7.webp,pro_hong_3_4819803724a94cd48550e94851237f96.webp,pro_hong_4_826098d8aa824cc8a5d4a1d704498b9d.webp}	495000	17	2023-06-01 15:45:44.759079+07	2023-06-24 14:47:43.897916+07	\N
187	23	10	1	dres630735slipik	pro_hong_1_b062594be0a144bcb999c7c7732bb4fe.webp	{pro_hong_1_b062594be0a144bcb999c7c7732bb4fe.webp,pro_hong_2_0a0e319108fc4e96a1b44f0a4ab3c27a.webp,pro_hong_3_aafab010ed5944cfaedb06fb0ab1d6df.webp,pro_hong_4_e06ea03db7674870b3f28199bb5bf0e8.webp}	495000	14	2023-06-01 15:48:30.053266+07	2023-06-24 14:47:43.897916+07	\N
188	23	10	2	dres630735mlipik	pro_hong_1_b062594be0a144bcb999c7c7732bb4fe.webp	{pro_hong_1_b062594be0a144bcb999c7c7732bb4fe.webp,pro_hong_2_0a0e319108fc4e96a1b44f0a4ab3c27a.webp,pro_hong_3_aafab010ed5944cfaedb06fb0ab1d6df.webp,pro_hong_4_e06ea03db7674870b3f28199bb5bf0e8.webp}	495000	14	2023-06-01 15:48:33.582972+07	2023-06-24 14:47:43.897916+07	\N
189	23	10	3	dres630735llipik	pro_hong_1_b062594be0a144bcb999c7c7732bb4fe.webp	{pro_hong_1_b062594be0a144bcb999c7c7732bb4fe.webp,pro_hong_2_0a0e319108fc4e96a1b44f0a4ab3c27a.webp,pro_hong_3_aafab010ed5944cfaedb06fb0ab1d6df.webp,pro_hong_4_e06ea03db7674870b3f28199bb5bf0e8.webp}	495000	15	2023-06-01 15:48:37.353557+07	2023-06-24 14:47:43.897916+07	\N
190	23	15	1	dres630735sdred	pro_do_1_0a0116f082554b84b2f819f18da91f92.webp	{pro_do_1_0a0116f082554b84b2f819f18da91f92.webp,pro_do_2_12e7e07425ed49a4951ff5588998859d.webp,pro_do_3_cccc101262e44c6c8be54e2684ee08a9.webp,pro_do_4_fb3b99a785b5479cbb45d8e6b99e869c.webp}	495000	15	2023-06-01 15:49:04.342838+07	2023-06-24 14:47:43.897916+07	\N
191	23	15	2	dres630735mdred	pro_do_1_0a0116f082554b84b2f819f18da91f92.webp	{pro_do_1_0a0116f082554b84b2f819f18da91f92.webp,pro_do_2_12e7e07425ed49a4951ff5588998859d.webp,pro_do_3_cccc101262e44c6c8be54e2684ee08a9.webp,pro_do_4_fb3b99a785b5479cbb45d8e6b99e869c.webp}	495000	15	2023-06-01 15:49:06.772371+07	2023-06-24 14:47:43.897916+07	\N
192	23	2	1	dres630735sblk	pro_den_1_22aea6fb477c4dd5ba1b51c1c26b42f5.webp	{pro_den_1_22aea6fb477c4dd5ba1b51c1c26b42f5.webp,pro_den_2_5a363706c3b84c03acd4b79b06b10444.webp,pro_den_3_e0aaffd30be34326a81d1ad7e6c68f61.webp,pro_den_4_f3bb1479d83b46e7844afdc9b8246321.webp}	495000	27	2023-06-01 15:49:31.441945+07	2023-06-24 14:47:43.897916+07	\N
193	23	2	2	dres630735mblk	pro_den_1_22aea6fb477c4dd5ba1b51c1c26b42f5.webp	{pro_den_1_22aea6fb477c4dd5ba1b51c1c26b42f5.webp,pro_den_2_5a363706c3b84c03acd4b79b06b10444.webp,pro_den_3_e0aaffd30be34326a81d1ad7e6c68f61.webp,pro_den_4_f3bb1479d83b46e7844afdc9b8246321.webp}	495000	27	2023-06-01 15:49:33.431759+07	2023-06-24 14:47:43.897916+07	\N
194	23	2	3	dres630735lblk	pro_den_1_22aea6fb477c4dd5ba1b51c1c26b42f5.webp	{pro_den_1_22aea6fb477c4dd5ba1b51c1c26b42f5.webp,pro_den_2_5a363706c3b84c03acd4b79b06b10444.webp,pro_den_3_e0aaffd30be34326a81d1ad7e6c68f61.webp,pro_den_4_f3bb1479d83b46e7844afdc9b8246321.webp}	495000	12	2023-06-01 15:49:37.072262+07	2023-06-24 14:47:43.897916+07	\N
195	23	15	3	dres630735ldred	pro_do_1_0a0116f082554b84b2f819f18da91f92.webp	{pro_do_1_0a0116f082554b84b2f819f18da91f92.webp,pro_do_2_12e7e07425ed49a4951ff5588998859d.webp,pro_do_3_cccc101262e44c6c8be54e2684ee08a9.webp,pro_do_4_fb3b99a785b5479cbb45d8e6b99e869c.webp}	495000	12	2023-06-01 15:50:46.264012+07	2023-06-24 14:47:43.897916+07	\N
196	24	6	1	dres667300swht	pro_trang_1_12bcb96ca80d4566b53783ca6bf6159b.webp	{pro_trang_1_12bcb96ca80d4566b53783ca6bf6159b.webp,pro_trang_2_0c524a70d8e94d319c4d9e6684690681.webp,pro_trang_3_b2afc14c497f4d3b99d0ac105068f485.webp,pro_trang_4_dd8d157c1f314765870d97d1c91d50b9.webp}	495000	12	2023-06-01 15:56:04.080947+07	2023-06-24 14:47:43.897916+07	\N
197	24	6	2	dres667300mwht	pro_trang_1_12bcb96ca80d4566b53783ca6bf6159b.webp	{pro_trang_1_12bcb96ca80d4566b53783ca6bf6159b.webp,pro_trang_2_0c524a70d8e94d319c4d9e6684690681.webp,pro_trang_3_b2afc14c497f4d3b99d0ac105068f485.webp,pro_trang_4_dd8d157c1f314765870d97d1c91d50b9.webp}	495000	12	2023-06-01 15:56:05.916088+07	2023-06-24 14:47:43.897916+07	\N
198	24	6	3	dres667300lwht	pro_trang_1_12bcb96ca80d4566b53783ca6bf6159b.webp	{pro_trang_1_12bcb96ca80d4566b53783ca6bf6159b.webp,pro_trang_2_0c524a70d8e94d319c4d9e6684690681.webp,pro_trang_3_b2afc14c497f4d3b99d0ac105068f485.webp,pro_trang_4_dd8d157c1f314765870d97d1c91d50b9.webp}	495000	12	2023-06-01 15:56:08.221677+07	2023-06-24 14:47:43.897916+07	\N
199	24	2	1	dres667300sblk	pro_den_1_3e9d5f8b2a0a482298370da8c642ebd1.webp	{pro_den_1_3e9d5f8b2a0a482298370da8c642ebd1.webp,pro_den_2_ef1f80be2a3b4b0291bffc49d682caa2.webp,pro_den_3_f46906e0e5b54c7e90e8725aa090e407.webp,pro_den_4_e26deb38b37044449514fc0ebf0f8700.webp}	495000	5	2023-06-01 15:56:24.510734+07	2023-06-24 14:47:43.897916+07	\N
200	24	2	2	dres667300mblk	pro_den_1_3e9d5f8b2a0a482298370da8c642ebd1.webp	{pro_den_1_3e9d5f8b2a0a482298370da8c642ebd1.webp,pro_den_2_ef1f80be2a3b4b0291bffc49d682caa2.webp,pro_den_3_f46906e0e5b54c7e90e8725aa090e407.webp,pro_den_4_e26deb38b37044449514fc0ebf0f8700.webp}	495000	6	2023-06-01 15:56:32.57122+07	2023-06-24 14:47:43.897916+07	\N
201	24	2	3	dres667300lblk	pro_den_1_3e9d5f8b2a0a482298370da8c642ebd1.webp	{pro_den_1_3e9d5f8b2a0a482298370da8c642ebd1.webp,pro_den_2_ef1f80be2a3b4b0291bffc49d682caa2.webp,pro_den_3_f46906e0e5b54c7e90e8725aa090e407.webp,pro_den_4_e26deb38b37044449514fc0ebf0f8700.webp}	495000	24	2023-06-01 15:56:37.42023+07	2023-06-24 14:47:43.897916+07	\N
202	24	11	1	dres667300svani	pro_kem_1_7400c5f10fc34c50a6544b7663be3ba8.webp	{pro_kem_1_7400c5f10fc34c50a6544b7663be3ba8.webp,pro_kem_2_6a0247e149fc4091ab30b1ff3d0ad1a8.webp,pro_kem_3_5913d2015b2e4e30bf18c8b46eee968e.webp,pro_kem_4_6cd741ed2abb4bc2bb9c50de65d1501c.webp}	495000	24	2023-06-01 15:57:04.381631+07	2023-06-24 14:47:43.897916+07	\N
203	24	11	2	dres667300mvani	pro_kem_1_7400c5f10fc34c50a6544b7663be3ba8.webp	{pro_kem_1_7400c5f10fc34c50a6544b7663be3ba8.webp,pro_kem_2_6a0247e149fc4091ab30b1ff3d0ad1a8.webp,pro_kem_3_5913d2015b2e4e30bf18c8b46eee968e.webp,pro_kem_4_6cd741ed2abb4bc2bb9c50de65d1501c.webp}	495000	24	2023-06-01 15:57:07.621647+07	2023-06-24 14:47:43.897916+07	\N
204	24	11	3	dres667300lvani	pro_kem_1_7400c5f10fc34c50a6544b7663be3ba8.webp	{pro_kem_1_7400c5f10fc34c50a6544b7663be3ba8.webp,pro_kem_2_6a0247e149fc4091ab30b1ff3d0ad1a8.webp,pro_kem_3_5913d2015b2e4e30bf18c8b46eee968e.webp,pro_kem_4_6cd741ed2abb4bc2bb9c50de65d1501c.webp}	495000	25	2023-06-01 15:57:11.696039+07	2023-06-24 14:47:43.897916+07	\N
205	24	7	1	dres667300slgre	pro_luc_nhat_1_6e9b75a16a954246b9f5a0d3d49bdaf1.webp	{pro_luc_nhat_1_6e9b75a16a954246b9f5a0d3d49bdaf1.webp,pro_luc_nhat_2_bc1fe50018824d3e867ed011d576c127.webp,pro_luc_nhat_3_f03508efab8746398adb5e40f8d1b094.webp,pro_luc_nhat_4_b63f78dbdc444122aa42fa8a65342ce5.webp}	495000	25	2023-06-01 15:57:34.126001+07	2023-06-24 14:47:43.897916+07	\N
206	24	7	2	dres667300mlgre	pro_luc_nhat_1_6e9b75a16a954246b9f5a0d3d49bdaf1.webp	{pro_luc_nhat_1_6e9b75a16a954246b9f5a0d3d49bdaf1.webp,pro_luc_nhat_2_bc1fe50018824d3e867ed011d576c127.webp,pro_luc_nhat_3_f03508efab8746398adb5e40f8d1b094.webp,pro_luc_nhat_4_b63f78dbdc444122aa42fa8a65342ce5.webp}	495000	25	2023-06-01 15:57:36.176135+07	2023-06-24 14:47:43.897916+07	\N
207	24	7	3	dres667300llgre	pro_luc_nhat_1_6e9b75a16a954246b9f5a0d3d49bdaf1.webp	{pro_luc_nhat_1_6e9b75a16a954246b9f5a0d3d49bdaf1.webp,pro_luc_nhat_2_bc1fe50018824d3e867ed011d576c127.webp,pro_luc_nhat_3_f03508efab8746398adb5e40f8d1b094.webp,pro_luc_nhat_4_b63f78dbdc444122aa42fa8a65342ce5.webp}	495000	5	2023-06-01 15:57:40.916549+07	2023-06-24 14:47:43.897916+07	\N
208	25	12	1	dres987089slblu	pro_xanh_duong_1_0a339c3328c5421f82c7ed7b4f2c0b3a.webp	{pro_xanh_duong_1_0a339c3328c5421f82c7ed7b4f2c0b3a.webp,pro_xanh_duong_2_4554ffa01bb24bbaaba188e608e678b2.webp,pro_xanh_duong_3_9afb99462eed49d0bd4cb9fb06525366.webp,pro_xanh_duong_4_66a1126860a34846af6a74aae0d0ff29.webp}	695000	22	2023-06-01 16:00:13.417152+07	2023-06-24 14:47:43.897916+07	\N
209	25	12	2	dres987089mlblu	pro_xanh_duong_1_0a339c3328c5421f82c7ed7b4f2c0b3a.webp	{pro_xanh_duong_1_0a339c3328c5421f82c7ed7b4f2c0b3a.webp,pro_xanh_duong_2_4554ffa01bb24bbaaba188e608e678b2.webp,pro_xanh_duong_3_9afb99462eed49d0bd4cb9fb06525366.webp,pro_xanh_duong_4_66a1126860a34846af6a74aae0d0ff29.webp}	695000	22	2023-06-01 16:00:18.525547+07	2023-06-24 14:47:43.897916+07	\N
210	25	12	3	dres987089llblu	pro_xanh_duong_1_0a339c3328c5421f82c7ed7b4f2c0b3a.webp	{pro_xanh_duong_1_0a339c3328c5421f82c7ed7b4f2c0b3a.webp,pro_xanh_duong_2_4554ffa01bb24bbaaba188e608e678b2.webp,pro_xanh_duong_3_9afb99462eed49d0bd4cb9fb06525366.webp,pro_xanh_duong_4_66a1126860a34846af6a74aae0d0ff29.webp}	695000	6	2023-06-01 16:00:23.505771+07	2023-06-24 14:47:43.897916+07	\N
211	25	10	1	dres987089slipik	pro_hong_1_f0174ad6d0bc42c7a0a763c759c8f457.webp	{pro_hong_1_f0174ad6d0bc42c7a0a763c759c8f457.webp,pro_hong_2_64bf9e0955d64f018a6e7667a0908ceb.webp,pro_hong_3_b81e7d98b865428b98000eec71575154.webp,pro_hong_4_76f1d6ee4b4e451db418ec32db0738b9.webp}	695000	6	2023-06-01 16:00:46.805383+07	2023-06-24 14:47:43.897916+07	\N
212	25	10	2	dres987089mlipik	pro_hong_1_f0174ad6d0bc42c7a0a763c759c8f457.webp	{pro_hong_1_f0174ad6d0bc42c7a0a763c759c8f457.webp,pro_hong_2_64bf9e0955d64f018a6e7667a0908ceb.webp,pro_hong_3_b81e7d98b865428b98000eec71575154.webp,pro_hong_4_76f1d6ee4b4e451db418ec32db0738b9.webp}	695000	6	2023-06-01 16:00:50.696468+07	2023-06-24 14:47:43.897916+07	\N
213	25	10	3	dres987089llipik	pro_hong_1_f0174ad6d0bc42c7a0a763c759c8f457.webp	{pro_hong_1_f0174ad6d0bc42c7a0a763c759c8f457.webp,pro_hong_2_64bf9e0955d64f018a6e7667a0908ceb.webp,pro_hong_3_b81e7d98b865428b98000eec71575154.webp,pro_hong_4_76f1d6ee4b4e451db418ec32db0738b9.webp}	695000	12	2023-06-01 16:00:54.535299+07	2023-06-24 14:47:43.897916+07	\N
214	26	6	1	dres221344swht	pro_trang_1_24a605b0916446b69384b99189e1d360.webp	{pro_trang_1_24a605b0916446b69384b99189e1d360.webp,pro_trang_2_9a041ae214b24ab9b6f82e2c9f9978a0.webp,pro_trang_3_2e50fa04e7664c59ae894d4ec6efae16.webp,pro_trang_4_a81cf6e21e9c46c38a26f71f581e30ea.webp}	1295000	12	2023-06-01 16:03:40.493962+07	2023-06-24 14:47:43.897916+07	\N
215	26	6	2	dres221344mwht	pro_trang_1_24a605b0916446b69384b99189e1d360.webp	{pro_trang_1_24a605b0916446b69384b99189e1d360.webp,pro_trang_2_9a041ae214b24ab9b6f82e2c9f9978a0.webp,pro_trang_3_2e50fa04e7664c59ae894d4ec6efae16.webp,pro_trang_4_a81cf6e21e9c46c38a26f71f581e30ea.webp}	1295000	12	2023-06-01 16:03:42.234203+07	2023-06-24 14:47:43.897916+07	\N
216	26	6	3	dres221344lwht	pro_trang_1_24a605b0916446b69384b99189e1d360.webp	{pro_trang_1_24a605b0916446b69384b99189e1d360.webp,pro_trang_2_9a041ae214b24ab9b6f82e2c9f9978a0.webp,pro_trang_3_2e50fa04e7664c59ae894d4ec6efae16.webp,pro_trang_4_a81cf6e21e9c46c38a26f71f581e30ea.webp}	1295000	6	2023-06-01 16:03:45.54439+07	2023-06-24 14:47:43.897916+07	\N
217	26	10	1	dres221344slipik	pro_hong_1_b77baf2a6fde45eab76be7a7cd4f4b10.webp	{pro_hong_1_b77baf2a6fde45eab76be7a7cd4f4b10.webp,pro_hong_2_625a7b702a91425aab2aab1608756974.webp,pro_hong_3_c09341ca632d4da38819ec958f23a8ff.webp,pro_hong_4_9d033fb71624421f84eddeeec3dfed94.webp}	1295000	6	2023-06-01 16:03:57.593662+07	2023-06-24 14:47:43.897916+07	\N
218	26	10	2	dres221344mlipik	pro_hong_1_b77baf2a6fde45eab76be7a7cd4f4b10.webp	{pro_hong_1_b77baf2a6fde45eab76be7a7cd4f4b10.webp,pro_hong_2_625a7b702a91425aab2aab1608756974.webp,pro_hong_3_c09341ca632d4da38819ec958f23a8ff.webp,pro_hong_4_9d033fb71624421f84eddeeec3dfed94.webp}	1295000	6	2023-06-01 16:03:59.883973+07	2023-06-24 14:47:43.897916+07	\N
219	26	10	3	dres221344llipik	pro_hong_1_b77baf2a6fde45eab76be7a7cd4f4b10.webp	{pro_hong_1_b77baf2a6fde45eab76be7a7cd4f4b10.webp,pro_hong_2_625a7b702a91425aab2aab1608756974.webp,pro_hong_3_c09341ca632d4da38819ec958f23a8ff.webp,pro_hong_4_9d033fb71624421f84eddeeec3dfed94.webp}	1295000	7	2023-06-01 16:04:03.114369+07	2023-06-24 14:47:43.897916+07	\N
220	26	12	1	dres221344slblu	pro_xanh_duong_1_fe1ae2d9830f4e0e9a263c3d0391d0f3.webp	{pro_xanh_duong_1_fe1ae2d9830f4e0e9a263c3d0391d0f3.webp,pro_xanh_duong_2_9f9d0ef2ac4f483b80c536e970a29850.webp,pro_xanh_duong_3_e45ffbe456e64c83bfbea7075cf9f351.webp,pro_xanh_duong_4_360f49a07c2e41efb971d446f568fd77.webp}	1295000	7	2023-06-01 16:04:26.624573+07	2023-06-24 14:47:43.897916+07	\N
221	26	12	2	dres221344mlblu	pro_xanh_duong_1_fe1ae2d9830f4e0e9a263c3d0391d0f3.webp	{pro_xanh_duong_1_fe1ae2d9830f4e0e9a263c3d0391d0f3.webp,pro_xanh_duong_2_9f9d0ef2ac4f483b80c536e970a29850.webp,pro_xanh_duong_3_e45ffbe456e64c83bfbea7075cf9f351.webp,pro_xanh_duong_4_360f49a07c2e41efb971d446f568fd77.webp}	1295000	7	2023-06-01 16:04:29.174095+07	2023-06-24 14:47:43.897916+07	\N
222	26	12	3	dres221344llblu	pro_xanh_duong_1_fe1ae2d9830f4e0e9a263c3d0391d0f3.webp	{pro_xanh_duong_1_fe1ae2d9830f4e0e9a263c3d0391d0f3.webp,pro_xanh_duong_2_9f9d0ef2ac4f483b80c536e970a29850.webp,pro_xanh_duong_3_e45ffbe456e64c83bfbea7075cf9f351.webp,pro_xanh_duong_4_360f49a07c2e41efb971d446f568fd77.webp}	1295000	14	2023-06-01 16:04:32.704065+07	2023-06-24 14:47:43.897916+07	\N
223	27	6	1	dres902229swht	pro_trang_1_8f9a0a59feca4586aeeee00dde890e96.webp	{pro_trang_1_8f9a0a59feca4586aeeee00dde890e96.webp,pro_trang_1_cb82ea4bf2944331a56034d8b0e92a30.webp,pro_trang_2_97121519de914ffb8997b12971e570d7.webp,pro_trang_4_b1b4c7b3bc354f1f941788565fe327f6.webp}	1295000	14	2023-06-01 16:06:41.675106+07	2023-06-24 14:47:43.897916+07	\N
224	27	6	2	dres902229mwht	pro_trang_1_8f9a0a59feca4586aeeee00dde890e96.webp	{pro_trang_1_8f9a0a59feca4586aeeee00dde890e96.webp,pro_trang_1_cb82ea4bf2944331a56034d8b0e92a30.webp,pro_trang_2_97121519de914ffb8997b12971e570d7.webp,pro_trang_4_b1b4c7b3bc354f1f941788565fe327f6.webp}	1295000	14	2023-06-01 16:06:43.644384+07	2023-06-24 14:47:43.897916+07	\N
225	27	6	3	dres902229lwht	pro_trang_1_8f9a0a59feca4586aeeee00dde890e96.webp	{pro_trang_1_8f9a0a59feca4586aeeee00dde890e96.webp,pro_trang_1_cb82ea4bf2944331a56034d8b0e92a30.webp,pro_trang_2_97121519de914ffb8997b12971e570d7.webp,pro_trang_4_b1b4c7b3bc354f1f941788565fe327f6.webp}	1295000	55	2023-06-01 16:06:48.003264+07	2023-06-24 14:47:43.897916+07	\N
226	27	11	1	dres902229svani	pro_kem_1_e5c761e067f24fe98471e0410c25b349.webp	{pro_kem_1_e5c761e067f24fe98471e0410c25b349.webp,pro_kem_2_3ba51269c9e4400fa8cb3569b7736fd8.webp,pro_kem_3_c89565eed9c446a08b251941713a6f6a.webp,pro_kem_4_fb1a6b1515244e6983e51828b87d0df7.webp}	1295000	55	2023-06-01 16:06:57.663944+07	2023-06-24 14:47:43.897916+07	\N
227	27	11	2	dres902229mvani	pro_kem_1_e5c761e067f24fe98471e0410c25b349.webp	{pro_kem_1_e5c761e067f24fe98471e0410c25b349.webp,pro_kem_2_3ba51269c9e4400fa8cb3569b7736fd8.webp,pro_kem_3_c89565eed9c446a08b251941713a6f6a.webp,pro_kem_4_fb1a6b1515244e6983e51828b87d0df7.webp}	1295000	22	2023-06-01 16:07:03.893509+07	2023-06-24 14:47:43.897916+07	\N
228	27	11	3	dres902229lvani	pro_kem_1_e5c761e067f24fe98471e0410c25b349.webp	{pro_kem_1_e5c761e067f24fe98471e0410c25b349.webp,pro_kem_2_3ba51269c9e4400fa8cb3569b7736fd8.webp,pro_kem_3_c89565eed9c446a08b251941713a6f6a.webp,pro_kem_4_fb1a6b1515244e6983e51828b87d0df7.webp}	1295000	22	2023-06-01 16:07:06.323661+07	2023-06-24 14:47:43.897916+07	\N
229	28	3	1	dres636811sblue	pro_xanh_duong_1_7f1293f7e08f4016a9dfaecd55cd7ed6.webp	{pro_xanh_duong_1_7f1293f7e08f4016a9dfaecd55cd7ed6.webp,pro_xanh_duong_2_cad72a749b1b4d01a1cc59515b381d76.webp,pro_xanh_duong_3_8820b95532054776989b3e67264617a6.webp,pro_xanh_duong_4_5d0242bb3fe24cc8b44b7bfffee6dda2.webp}	1295000	22	2023-06-01 16:09:57.199823+07	2023-06-24 14:47:43.897916+07	\N
230	28	3	2	dres636811mblue	pro_xanh_duong_1_7f1293f7e08f4016a9dfaecd55cd7ed6.webp	{pro_xanh_duong_1_7f1293f7e08f4016a9dfaecd55cd7ed6.webp,pro_xanh_duong_2_cad72a749b1b4d01a1cc59515b381d76.webp,pro_xanh_duong_3_8820b95532054776989b3e67264617a6.webp,pro_xanh_duong_4_5d0242bb3fe24cc8b44b7bfffee6dda2.webp}	1295000	22	2023-06-01 16:10:01.189164+07	2023-06-24 14:47:43.897916+07	\N
231	28	3	3	dres636811lblue	pro_xanh_duong_1_7f1293f7e08f4016a9dfaecd55cd7ed6.webp	{pro_xanh_duong_1_7f1293f7e08f4016a9dfaecd55cd7ed6.webp,pro_xanh_duong_2_cad72a749b1b4d01a1cc59515b381d76.webp,pro_xanh_duong_3_8820b95532054776989b3e67264617a6.webp,pro_xanh_duong_4_5d0242bb3fe24cc8b44b7bfffee6dda2.webp}	1295000	4	2023-06-01 16:10:05.549144+07	2023-06-24 14:47:43.897916+07	\N
232	28	8	1	dres636811slpik	pro_hong_1_a23e3d87baae4c76b28414f975f6112b.webp	{pro_hong_1_a23e3d87baae4c76b28414f975f6112b.webp,pro_hong_2_676f20dc5a234891b72f59bd342ca2a7.webp,pro_hong_3_389c3e01cfec46cc81730d5a788d2341.webp,pro_hong_4_03953c7af34f473d96240703ff7c8e74.webp}	1295000	4	2023-06-01 16:10:22.488659+07	2023-06-24 14:47:43.897916+07	\N
233	29	11	1	dres498744svani	pro_da_1_fafbb306f1204ff19b38655ea84ed059.webp	{pro_da_1_fafbb306f1204ff19b38655ea84ed059.webp,pro_da_2_7aa8a475553443ae83c0730192649f8b.webp,pro_da_3_d8fcf8b168374da69928f43229f89c6c.webp,pro_da_4_5bc7a27d8bd047e0b953b718448a19f9.webp}	895000	22	2023-06-01 16:13:16.797012+07	2023-06-24 14:47:43.897916+07	\N
234	29	11	2	dres498744mvani	pro_da_1_fafbb306f1204ff19b38655ea84ed059.webp	{pro_da_1_fafbb306f1204ff19b38655ea84ed059.webp,pro_da_2_7aa8a475553443ae83c0730192649f8b.webp,pro_da_3_d8fcf8b168374da69928f43229f89c6c.webp,pro_da_4_5bc7a27d8bd047e0b953b718448a19f9.webp}	895000	24	2023-06-01 16:13:21.496434+07	2023-06-24 14:47:43.897916+07	\N
235	29	11	3	dres498744lvani	pro_da_1_fafbb306f1204ff19b38655ea84ed059.webp	{pro_da_1_fafbb306f1204ff19b38655ea84ed059.webp,pro_da_2_7aa8a475553443ae83c0730192649f8b.webp,pro_da_3_d8fcf8b168374da69928f43229f89c6c.webp,pro_da_4_5bc7a27d8bd047e0b953b718448a19f9.webp}	895000	6	2023-06-01 16:13:25.156288+07	2023-06-24 14:47:43.897916+07	\N
236	29	2	1	dres498744sblk	pro_den_1_a953635931c54e5e9f386ca51f1c9b74.webp	{pro_den_1_a953635931c54e5e9f386ca51f1c9b74.webp,pro_den_2_7a0e34b16b4a4d00b631f466bfcec495.webp,pro_den_3_5ee7ba379dcc4332b1352616e2715159.webp,pro_den_4_40c52a01cc334e5296bda760cd038297.webp}	895000	6	2023-06-01 16:14:12.525925+07	2023-06-24 14:47:43.897916+07	\N
237	29	2	2	dres498744mblk	pro_den_1_a953635931c54e5e9f386ca51f1c9b74.webp	{pro_den_1_a953635931c54e5e9f386ca51f1c9b74.webp,pro_den_2_7a0e34b16b4a4d00b631f466bfcec495.webp,pro_den_3_5ee7ba379dcc4332b1352616e2715159.webp,pro_den_4_40c52a01cc334e5296bda760cd038297.webp}	895000	6	2023-06-01 16:14:16.085044+07	2023-06-24 14:47:43.897916+07	\N
238	29	2	3	dres498744lblk	pro_den_1_a953635931c54e5e9f386ca51f1c9b74.webp	{pro_den_1_a953635931c54e5e9f386ca51f1c9b74.webp,pro_den_2_7a0e34b16b4a4d00b631f466bfcec495.webp,pro_den_3_5ee7ba379dcc4332b1352616e2715159.webp,pro_den_4_40c52a01cc334e5296bda760cd038297.webp}	895000	6	2023-06-01 16:14:18.022373+07	2023-06-24 14:47:43.897916+07	\N
239	29	9	1	dres498744sjgre	pro_luc_dam_1_b03514e9f1aa4736aaf1ca210db9a3bd.webp	{pro_luc_dam_1_b03514e9f1aa4736aaf1ca210db9a3bd.webp,pro_luc_dam_2_c9fc024ff4bc44c0a1105ecdd2d253e3.webp,pro_luc_dam_3_10ad9af68bd541cdba18d4c40a92c8bf.webp,pro_luc_dam_4_1810412b15ce40ceb65a7dd585b7e67b.webp}	895000	6	2023-06-01 16:14:37.775307+07	2023-06-24 14:47:43.897916+07	\N
240	29	9	2	dres498744mjgre	pro_luc_dam_1_b03514e9f1aa4736aaf1ca210db9a3bd.webp	{pro_luc_dam_1_b03514e9f1aa4736aaf1ca210db9a3bd.webp,pro_luc_dam_2_c9fc024ff4bc44c0a1105ecdd2d253e3.webp,pro_luc_dam_3_10ad9af68bd541cdba18d4c40a92c8bf.webp,pro_luc_dam_4_1810412b15ce40ceb65a7dd585b7e67b.webp}	895000	6	2023-06-01 16:14:45.314595+07	2023-06-24 14:47:43.897916+07	\N
241	29	9	3	dres498744ljgre	pro_luc_dam_1_b03514e9f1aa4736aaf1ca210db9a3bd.webp	{pro_luc_dam_1_b03514e9f1aa4736aaf1ca210db9a3bd.webp,pro_luc_dam_2_c9fc024ff4bc44c0a1105ecdd2d253e3.webp,pro_luc_dam_3_10ad9af68bd541cdba18d4c40a92c8bf.webp,pro_luc_dam_4_1810412b15ce40ceb65a7dd585b7e67b.webp}	895000	22	2023-06-01 16:14:49.544898+07	2023-06-24 14:47:43.897916+07	\N
242	28	8	2	dres636811mlpik	pro_hong_1_a23e3d87baae4c76b28414f975f6112b.webp	{pro_hong_1_a23e3d87baae4c76b28414f975f6112b.webp,pro_hong_2_676f20dc5a234891b72f59bd342ca2a7.webp,pro_hong_3_389c3e01cfec46cc81730d5a788d2341.webp,pro_hong_4_03953c7af34f473d96240703ff7c8e74.webp}	895000	22	2023-06-01 16:17:45.592404+07	2023-06-24 14:47:43.897916+07	\N
243	28	8	3	dres636811llpik	pro_hong_1_a23e3d87baae4c76b28414f975f6112b.webp	{pro_hong_1_a23e3d87baae4c76b28414f975f6112b.webp,pro_hong_2_676f20dc5a234891b72f59bd342ca2a7.webp,pro_hong_3_389c3e01cfec46cc81730d5a788d2341.webp,pro_hong_4_03953c7af34f473d96240703ff7c8e74.webp}	895000	22	2023-06-01 16:17:47.812394+07	2023-06-24 14:47:43.897916+07	\N
244	30	6	1	dres166216swht	pro_trang_1_c0f6756dfd93402ba9985e76ec66deb5.webp	{pro_trang_1_c0f6756dfd93402ba9985e76ec66deb5.webp,pro_trang_2_37db151365694c4cbb0f271096937808.webp,pro_trang_3_d282ef732cff41948bb222aeaae84f4e.webp,pro_trang_4_c8aa29f949504e12ad576135534f58ea.webp}	995000	14	2023-06-01 16:19:24.17154+07	2023-06-24 14:47:43.897916+07	\N
245	30	6	2	dres166216mwht	pro_trang_1_c0f6756dfd93402ba9985e76ec66deb5.webp	{pro_trang_1_c0f6756dfd93402ba9985e76ec66deb5.webp,pro_trang_2_37db151365694c4cbb0f271096937808.webp,pro_trang_3_d282ef732cff41948bb222aeaae84f4e.webp,pro_trang_4_c8aa29f949504e12ad576135534f58ea.webp}	995000	14	2023-06-01 16:19:25.861302+07	2023-06-24 14:47:43.897916+07	\N
246	30	6	3	dres166216lwht	pro_trang_1_c0f6756dfd93402ba9985e76ec66deb5.webp	{pro_trang_1_c0f6756dfd93402ba9985e76ec66deb5.webp,pro_trang_2_37db151365694c4cbb0f271096937808.webp,pro_trang_3_d282ef732cff41948bb222aeaae84f4e.webp,pro_trang_4_c8aa29f949504e12ad576135534f58ea.webp}	995000	14	2023-06-01 16:19:28.701476+07	2023-06-24 14:47:43.897916+07	\N
247	31	6	1	dres599551swht	pro_trang_1_3ed3b78bceae4522a8792b36f7482c93.webp	{pro_trang_1_3ed3b78bceae4522a8792b36f7482c93.webp,pro_trang_2_3365bc93d25a47e092d6719ac07d3676.webp,pro_trang_2_8798147c8e9a4a0da6b95f52638b8dac.webp,pro_trang_4_eb671903e03b4e76a540694d5934770b.webp}	995000	14	2023-06-01 16:22:16.830977+07	2023-06-24 14:47:43.897916+07	\N
248	31	6	2	dres599551mwht	pro_trang_1_3ed3b78bceae4522a8792b36f7482c93.webp	{pro_trang_1_3ed3b78bceae4522a8792b36f7482c93.webp,pro_trang_2_3365bc93d25a47e092d6719ac07d3676.webp,pro_trang_2_8798147c8e9a4a0da6b95f52638b8dac.webp,pro_trang_4_eb671903e03b4e76a540694d5934770b.webp}	995000	14	2023-06-01 16:22:19.280259+07	2023-06-24 14:47:43.897916+07	\N
249	31	6	3	dres599551lwht	pro_trang_1_3ed3b78bceae4522a8792b36f7482c93.webp	{pro_trang_1_3ed3b78bceae4522a8792b36f7482c93.webp,pro_trang_2_3365bc93d25a47e092d6719ac07d3676.webp,pro_trang_2_8798147c8e9a4a0da6b95f52638b8dac.webp,pro_trang_4_eb671903e03b4e76a540694d5934770b.webp}	995000	7	2023-06-01 16:22:23.640334+07	2023-06-24 14:47:43.897916+07	\N
251	31	15	2	dres599551mdred	pro_do_1_88bd0e2937d34303b9ee096d7e06cc9d.webp	{pro_do_1_88bd0e2937d34303b9ee096d7e06cc9d.webp,pro_do_2_13d16b20fbeb4ee19d2bab1135777e98.webp,pro_do_3_ac6d62b7de31409192825151d092890c.webp,pro_do_4_441f521d404c4ef391bbed65e48d9f47.webp}	995000	7	2023-06-01 16:24:58.6439+07	2023-06-24 14:47:43.897916+07	\N
252	31	15	3	dres599551ldred	pro_do_1_88bd0e2937d34303b9ee096d7e06cc9d.webp	{pro_do_1_88bd0e2937d34303b9ee096d7e06cc9d.webp,pro_do_2_13d16b20fbeb4ee19d2bab1135777e98.webp,pro_do_3_ac6d62b7de31409192825151d092890c.webp,pro_do_4_441f521d404c4ef391bbed65e48d9f47.webp}	995000	18	2023-06-01 16:25:02.209459+07	2023-06-24 14:47:43.897916+07	\N
253	32	8	1	polo948102slpik	pro_hong_nhat_1_0448a4334b254570abc3d3bc9419a46c.webp	{pro_hong_nhat_1_0448a4334b254570abc3d3bc9419a46c.webp,pro_hong_nhat_2_fbdf048b010d4825acbecbb8ba4cb349.webp,pro_hong_nhat_3_e311b8e0339e4055ba8e0fb098abfb92.webp,pro_hong_nhat_4_f2d927c66fa742ed8a2a391bf57d02ee.webp}	255000	58	2023-06-01 16:39:30.009389+07	2023-06-24 14:47:43.897916+07	\N
254	32	8	2	polo948102mlpik	pro_hong_nhat_1_0448a4334b254570abc3d3bc9419a46c.webp	{pro_hong_nhat_1_0448a4334b254570abc3d3bc9419a46c.webp,pro_hong_nhat_2_fbdf048b010d4825acbecbb8ba4cb349.webp,pro_hong_nhat_3_e311b8e0339e4055ba8e0fb098abfb92.webp,pro_hong_nhat_4_f2d927c66fa742ed8a2a391bf57d02ee.webp}	255000	58	2023-06-01 16:39:32.389547+07	2023-06-24 14:47:43.897916+07	\N
255	32	8	3	polo948102llpik	pro_hong_nhat_1_0448a4334b254570abc3d3bc9419a46c.webp	{pro_hong_nhat_1_0448a4334b254570abc3d3bc9419a46c.webp,pro_hong_nhat_2_fbdf048b010d4825acbecbb8ba4cb349.webp,pro_hong_nhat_3_e311b8e0339e4055ba8e0fb098abfb92.webp,pro_hong_nhat_4_f2d927c66fa742ed8a2a391bf57d02ee.webp}	255000	12	2023-06-01 16:39:40.498371+07	2023-06-24 14:47:43.897916+07	\N
256	32	16	1	polo948102syel	pro_vang_1_3f7ae098d8334b478d2cdec0ac72df67.webp	{pro_vang_1_3f7ae098d8334b478d2cdec0ac72df67.webp,pro_vang_2_0b139f5c92704e79a2054de0ecfcff13.webp,pro_vang_3_daa71217ce704d958929158f8d9301f0.webp,pro_vang_4_0065806512f947bbbe1b178f15a58818.webp}	255000	12	2023-06-01 16:41:43.447329+07	2023-06-24 14:47:43.897916+07	\N
257	32	16	2	polo948102myel	pro_vang_1_3f7ae098d8334b478d2cdec0ac72df67.webp	{pro_vang_1_3f7ae098d8334b478d2cdec0ac72df67.webp,pro_vang_2_0b139f5c92704e79a2054de0ecfcff13.webp,pro_vang_3_daa71217ce704d958929158f8d9301f0.webp,pro_vang_4_0065806512f947bbbe1b178f15a58818.webp}	255000	14	2023-06-01 16:41:48.70746+07	2023-06-24 14:47:43.897916+07	\N
258	32	16	3	polo948102lyel	pro_vang_1_3f7ae098d8334b478d2cdec0ac72df67.webp	{pro_vang_1_3f7ae098d8334b478d2cdec0ac72df67.webp,pro_vang_2_0b139f5c92704e79a2054de0ecfcff13.webp,pro_vang_3_daa71217ce704d958929158f8d9301f0.webp,pro_vang_4_0065806512f947bbbe1b178f15a58818.webp}	255000	15	2023-06-01 16:41:52.597637+07	2023-06-24 14:47:43.897916+07	\N
259	33	6	1	polo341207swht	pro_trang_1_1946376c207d46ccb4a7e3470c40924c.webp	{pro_trang_1_1946376c207d46ccb4a7e3470c40924c.webp,pro_trang_2_a6ca6aa4426943e38bf59a916d095fb3.webp,pro_trang_3_0ac350e8ec9b4c37a6235803247b1b03.webp,pro_trang_4_1cd68507fce143daadecc76db254e4e3.webp}	255000	15	2023-06-01 16:43:54.360651+07	2023-06-24 14:47:43.897916+07	\N
260	33	6	2	polo341207mwht	pro_trang_1_1946376c207d46ccb4a7e3470c40924c.webp	{pro_trang_1_1946376c207d46ccb4a7e3470c40924c.webp,pro_trang_2_a6ca6aa4426943e38bf59a916d095fb3.webp,pro_trang_3_0ac350e8ec9b4c37a6235803247b1b03.webp,pro_trang_4_1cd68507fce143daadecc76db254e4e3.webp}	255000	15	2023-06-01 16:43:55.956135+07	2023-06-24 14:47:43.897916+07	\N
261	33	6	3	polo341207lwht	pro_trang_1_1946376c207d46ccb4a7e3470c40924c.webp	{pro_trang_1_1946376c207d46ccb4a7e3470c40924c.webp,pro_trang_2_a6ca6aa4426943e38bf59a916d095fb3.webp,pro_trang_3_0ac350e8ec9b4c37a6235803247b1b03.webp,pro_trang_4_1cd68507fce143daadecc76db254e4e3.webp}	255000	15	2023-06-01 16:43:57.736722+07	2023-06-24 14:47:43.897916+07	\N
262	33	2	1	polo341207sblk	pro_den_1_f59eabc178a040a0a4509bf5a69f6314.webp	{pro_den_1_f59eabc178a040a0a4509bf5a69f6314.webp,pro_den_2_68920729ffa24024903759067b83854c.webp,pro_den_3_24a4333dbdee4855a6904862aeb5f932.webp,pro_den_4_332562631e574ffaa504f2f6a0ee5fa4.webp}	255000	18	2023-06-01 16:45:33.20751+07	2023-06-24 14:47:43.897916+07	\N
263	33	2	2	polo341207mblk	pro_den_1_f59eabc178a040a0a4509bf5a69f6314.webp	{pro_den_1_f59eabc178a040a0a4509bf5a69f6314.webp,pro_den_2_68920729ffa24024903759067b83854c.webp,pro_den_3_24a4333dbdee4855a6904862aeb5f932.webp,pro_den_4_332562631e574ffaa504f2f6a0ee5fa4.webp}	255000	22	2023-06-01 16:45:36.054892+07	2023-06-24 14:47:43.897916+07	\N
264	33	2	3	polo341207lblk	pro_den_1_f59eabc178a040a0a4509bf5a69f6314.webp	{pro_den_1_f59eabc178a040a0a4509bf5a69f6314.webp,pro_den_2_68920729ffa24024903759067b83854c.webp,pro_den_3_24a4333dbdee4855a6904862aeb5f932.webp,pro_den_4_332562631e574ffaa504f2f6a0ee5fa4.webp}	255000	22	2023-06-01 16:45:38.465106+07	2023-06-24 14:47:43.897916+07	\N
266	34	8	2	polo142967mlpik	pro_hoa_hong_4_b65eb70fb9e24247844eb0c7a664c424.webp	{pro_hoa_hong_4_b65eb70fb9e24247844eb0c7a664c424.webp,pro_hoa_hong_3_444ed078b3244b679403fb33a2a3bbc6.webp,pro_hoa_hong_2_ab648f4858464bc4a523ed982d902f99.webp,pro_hoa_hong_1_307225b7993846e58240c95a160e9eb2.webp}	255000	22	2023-06-01 16:48:57.862875+07	2023-06-24 14:47:43.897916+07	\N
267	34	8	3	polo142967llpik	pro_hoa_hong_4_b65eb70fb9e24247844eb0c7a664c424.webp	{pro_hoa_hong_4_b65eb70fb9e24247844eb0c7a664c424.webp,pro_hoa_hong_3_444ed078b3244b679403fb33a2a3bbc6.webp,pro_hoa_hong_2_ab648f4858464bc4a523ed982d902f99.webp,pro_hoa_hong_1_307225b7993846e58240c95a160e9eb2.webp}	255000	22	2023-06-01 16:48:59.642569+07	2023-06-24 14:47:43.897916+07	\N
269	34	5	2	polo142967mbro	pro_nau_4_3e9ab34f655a48b9af526d3c4a802072.webp	{pro_nau_4_3e9ab34f655a48b9af526d3c4a802072.webp,pro_nau_3_c427b997b373439e9c0a4a2a44d45dcc.webp,pro_nau_2_30ac320d659e4da2b9bcb191330f4c94.webp,pro_nau_1_a774668401fa468bb16a36ace7a441b9.webp}	255000	22	2023-06-01 16:49:13.802939+07	2023-06-24 14:47:43.897916+07	\N
270	34	5	3	polo142967lbro	pro_nau_4_3e9ab34f655a48b9af526d3c4a802072.webp	{pro_nau_4_3e9ab34f655a48b9af526d3c4a802072.webp,pro_nau_3_c427b997b373439e9c0a4a2a44d45dcc.webp,pro_nau_2_30ac320d659e4da2b9bcb191330f4c94.webp,pro_nau_1_a774668401fa468bb16a36ace7a441b9.webp}	255000	4	2023-06-01 16:49:19.182361+07	2023-06-24 14:47:43.897916+07	\N
268	34	5	1	polo142967sbro	pro_nau_4_3e9ab34f655a48b9af526d3c4a802072.webp	{pro_nau_4_3e9ab34f655a48b9af526d3c4a802072.webp,pro_nau_3_c427b997b373439e9c0a4a2a44d45dcc.webp,pro_nau_2_30ac320d659e4da2b9bcb191330f4c94.webp,pro_nau_1_a774668401fa468bb16a36ace7a441b9.webp}	255000	21	2023-06-01 16:49:12.162535+07	2023-06-24 14:47:43.897916+07	\N
271	35	6	1	crop295322swht	pro_trang_1_633c1c81b7ab4f4da7158aaaf4bfe4df.webp	{pro_trang_1_633c1c81b7ab4f4da7158aaaf4bfe4df.webp,pro_trang_2_7cb11adf2927467fbaf1dd7e699405f3.webp,pro_trang_3_5b4ef943a7484ee99d05231a20eab543.webp,pro_trang_4_5277f74150a343569d86c30b9660e0e1.webp}	175000	8	2023-06-01 17:00:09.006911+07	2023-06-24 14:47:43.897916+07	\N
272	35	6	2	crop295322mwht	pro_trang_1_633c1c81b7ab4f4da7158aaaf4bfe4df.webp	{pro_trang_1_633c1c81b7ab4f4da7158aaaf4bfe4df.webp,pro_trang_2_7cb11adf2927467fbaf1dd7e699405f3.webp,pro_trang_3_5b4ef943a7484ee99d05231a20eab543.webp,pro_trang_4_5277f74150a343569d86c30b9660e0e1.webp}	175000	9	2023-06-01 17:00:12.746302+07	2023-06-24 14:47:43.897916+07	\N
273	35	6	3	crop295322lwht	pro_trang_1_633c1c81b7ab4f4da7158aaaf4bfe4df.webp	{pro_trang_1_633c1c81b7ab4f4da7158aaaf4bfe4df.webp,pro_trang_2_7cb11adf2927467fbaf1dd7e699405f3.webp,pro_trang_3_5b4ef943a7484ee99d05231a20eab543.webp,pro_trang_4_5277f74150a343569d86c30b9660e0e1.webp}	175000	9	2023-06-01 17:00:16.316437+07	2023-06-24 14:47:43.897916+07	\N
274	35	2	1	crop295322sblk	pro_den_1_56fd195d5dae43c38bc18e3818db3a1c.webp	{pro_den_1_56fd195d5dae43c38bc18e3818db3a1c.webp,pro_den_2_a9f0496541c34808bfaa599f46427b8e.webp,pro_den_3_7a15680aa96144178801c72b79547d22.webp,pro_den_4_d7b6a3d223ff430eaf14b60c37501e2f.webp}	175000	9	2023-06-01 17:00:44.835857+07	2023-06-24 14:47:43.897916+07	\N
275	35	2	2	crop295322mblk	pro_den_1_56fd195d5dae43c38bc18e3818db3a1c.webp	{pro_den_1_56fd195d5dae43c38bc18e3818db3a1c.webp,pro_den_2_a9f0496541c34808bfaa599f46427b8e.webp,pro_den_3_7a15680aa96144178801c72b79547d22.webp,pro_den_4_d7b6a3d223ff430eaf14b60c37501e2f.webp}	175000	5	2023-06-01 17:00:48.577367+07	2023-06-24 14:47:43.897916+07	\N
276	35	2	3	crop295322lblk	pro_den_1_56fd195d5dae43c38bc18e3818db3a1c.webp	{pro_den_1_56fd195d5dae43c38bc18e3818db3a1c.webp,pro_den_2_a9f0496541c34808bfaa599f46427b8e.webp,pro_den_3_7a15680aa96144178801c72b79547d22.webp,pro_den_4_d7b6a3d223ff430eaf14b60c37501e2f.webp}	175000	55	2023-06-01 17:00:54.16709+07	2023-06-24 14:47:43.897916+07	\N
277	35	8	1	crop295322slpik	pro_hong_1_d3863e76e33144d09c0b998a77b4508a.webp	{pro_hong_1_d3863e76e33144d09c0b998a77b4508a.webp,pro_hong_2_a895778caa6a45908cab5c643c0afc90.webp,pro_hong_3_3e18365a0ac94c63a06d4db4a7bae3b4.webp,pro_hong_4_6cdddbc9382d41b091ec14c8018e228e.webp}	175000	44	2023-06-01 17:01:15.026904+07	2023-06-24 14:47:43.897916+07	\N
278	35	8	2	crop295322mlpik	pro_hong_1_d3863e76e33144d09c0b998a77b4508a.webp	{pro_hong_1_d3863e76e33144d09c0b998a77b4508a.webp,pro_hong_2_a895778caa6a45908cab5c643c0afc90.webp,pro_hong_3_3e18365a0ac94c63a06d4db4a7bae3b4.webp,pro_hong_4_6cdddbc9382d41b091ec14c8018e228e.webp}	175000	55	2023-06-01 17:01:20.525837+07	2023-06-24 14:47:43.897916+07	\N
279	35	8	3	crop295322llpik	pro_hong_1_d3863e76e33144d09c0b998a77b4508a.webp	{pro_hong_1_d3863e76e33144d09c0b998a77b4508a.webp,pro_hong_2_a895778caa6a45908cab5c643c0afc90.webp,pro_hong_3_3e18365a0ac94c63a06d4db4a7bae3b4.webp,pro_hong_4_6cdddbc9382d41b091ec14c8018e228e.webp}	175000	55	2023-06-01 17:01:22.225898+07	2023-06-24 14:47:43.897916+07	\N
280	36	17	1	crop712553spik	pro_hong_1_c2ea3dbe05af425584dd5def1b6fd72e.webp	{pro_hong_1_c2ea3dbe05af425584dd5def1b6fd72e.webp,pro_hong_2_c2f9944c5f814d94ac929b562c4588c1.webp,pro_hong_3_ecfd2422640e48ad8589728e737c5bb5.webp,pro_hong_4_f63d01b442084a3293e343047329f2c8.webp}	175000	42	2023-06-01 17:04:41.761235+07	2023-06-24 14:47:43.897916+07	\N
281	36	17	2	crop712553mpik	pro_hong_1_c2ea3dbe05af425584dd5def1b6fd72e.webp	{pro_hong_1_c2ea3dbe05af425584dd5def1b6fd72e.webp,pro_hong_2_c2f9944c5f814d94ac929b562c4588c1.webp,pro_hong_3_ecfd2422640e48ad8589728e737c5bb5.webp,pro_hong_4_f63d01b442084a3293e343047329f2c8.webp}	175000	22	2023-06-01 17:04:49.001445+07	2023-06-24 14:47:43.897916+07	\N
282	36	17	3	crop712553lpik	pro_hong_1_c2ea3dbe05af425584dd5def1b6fd72e.webp	{pro_hong_1_c2ea3dbe05af425584dd5def1b6fd72e.webp,pro_hong_2_c2f9944c5f814d94ac929b562c4588c1.webp,pro_hong_3_ecfd2422640e48ad8589728e737c5bb5.webp,pro_hong_4_f63d01b442084a3293e343047329f2c8.webp}	175000	54	2023-06-01 17:04:55.690676+07	2023-06-24 14:47:43.897916+07	\N
283	36	2	1	crop712553sblk	pro_den_1_ea862b5bd07841dc8f06fda4cae8d2ef.webp	{pro_den_1_ea862b5bd07841dc8f06fda4cae8d2ef.webp,pro_den_2_8463c68ae9784ff5a0d48927a14983c4.webp,pro_den_3_251729f74e7941d29c5eb041014022ad.webp,pro_den_4_5139f7a35c8e4887a81943cf52a0f357.webp}	175000	54	2023-06-01 17:05:20.545708+07	2023-06-24 14:47:43.897916+07	\N
284	36	2	2	crop712553mblk	pro_den_1_ea862b5bd07841dc8f06fda4cae8d2ef.webp	{pro_den_1_ea862b5bd07841dc8f06fda4cae8d2ef.webp,pro_den_2_8463c68ae9784ff5a0d48927a14983c4.webp,pro_den_3_251729f74e7941d29c5eb041014022ad.webp,pro_den_4_5139f7a35c8e4887a81943cf52a0f357.webp}	175000	54	2023-06-01 17:05:27.195291+07	2023-06-24 14:47:43.897916+07	\N
285	36	2	3	crop712553lblk	pro_den_1_ea862b5bd07841dc8f06fda4cae8d2ef.webp	{pro_den_1_ea862b5bd07841dc8f06fda4cae8d2ef.webp,pro_den_2_8463c68ae9784ff5a0d48927a14983c4.webp,pro_den_3_251729f74e7941d29c5eb041014022ad.webp,pro_den_4_5139f7a35c8e4887a81943cf52a0f357.webp}	175000	2	2023-06-01 17:05:29.535335+07	2023-06-24 14:47:43.897916+07	\N
286	37	6	1	crop415334swht	pro_trang_1_05f3f5c8fcb34427b8e4402b694b6f9e.webp	{pro_trang_1_05f3f5c8fcb34427b8e4402b694b6f9e.webp,pro_trang_2_4d2d13a6f8aa47a797bb4347302a5d6b.webp,pro_trang_3_75c79f6a6dd44e729dadc48012a374d4.webp,pro_trang_4_ddbf43e5469c4912bb5a5ea011934da0.webp}	275000	22	2023-06-01 17:10:14.470844+07	2023-06-24 14:47:43.897916+07	\N
287	37	6	2	crop415334mwht	pro_trang_1_05f3f5c8fcb34427b8e4402b694b6f9e.webp	{pro_trang_1_05f3f5c8fcb34427b8e4402b694b6f9e.webp,pro_trang_2_4d2d13a6f8aa47a797bb4347302a5d6b.webp,pro_trang_3_75c79f6a6dd44e729dadc48012a374d4.webp,pro_trang_4_ddbf43e5469c4912bb5a5ea011934da0.webp}	275000	5	2023-06-01 17:10:20.82026+07	2023-06-24 14:47:43.897916+07	\N
288	37	6	3	crop415334lwht	pro_trang_1_05f3f5c8fcb34427b8e4402b694b6f9e.webp	{pro_trang_1_05f3f5c8fcb34427b8e4402b694b6f9e.webp,pro_trang_2_4d2d13a6f8aa47a797bb4347302a5d6b.webp,pro_trang_3_75c79f6a6dd44e729dadc48012a374d4.webp,pro_trang_4_ddbf43e5469c4912bb5a5ea011934da0.webp}	275000	52	2023-06-01 17:10:24.48044+07	2023-06-24 14:47:43.897916+07	\N
289	37	2	1	crop415334sblk	pro_den_1_e4d782e33479470891fe60f10cffe0fa.webp	{pro_den_1_e4d782e33479470891fe60f10cffe0fa.webp,pro_den_2_400f6e7a95934a06b0a895343c2adc2d.webp,pro_den_3_906efbbf7fa94c3ca11bf38302a0e39f.webp,pro_den_4_0b63e480d9e64e7ca17c855bd3335548.webp}	275000	52	2023-06-01 17:10:38.490593+07	2023-06-24 14:47:43.897916+07	\N
290	37	2	2	crop415334mblk	pro_den_1_e4d782e33479470891fe60f10cffe0fa.webp	{pro_den_1_e4d782e33479470891fe60f10cffe0fa.webp,pro_den_2_400f6e7a95934a06b0a895343c2adc2d.webp,pro_den_3_906efbbf7fa94c3ca11bf38302a0e39f.webp,pro_den_4_0b63e480d9e64e7ca17c855bd3335548.webp}	275000	52	2023-06-01 17:10:41.508642+07	2023-06-24 14:47:43.897916+07	\N
291	37	2	3	crop415334lblk	pro_den_1_e4d782e33479470891fe60f10cffe0fa.webp	{pro_den_1_e4d782e33479470891fe60f10cffe0fa.webp,pro_den_2_400f6e7a95934a06b0a895343c2adc2d.webp,pro_den_3_906efbbf7fa94c3ca11bf38302a0e39f.webp,pro_den_4_0b63e480d9e64e7ca17c855bd3335548.webp}	275000	5	2023-06-01 17:10:46.058408+07	2023-06-24 14:47:43.897916+07	\N
292	37	8	1	crop415334slpik	pro_hong_nhat_1_bef80eec522447a0b288f007e364353d.webp	{pro_hong_nhat_1_bef80eec522447a0b288f007e364353d.webp,pro_hong_nhat_2_d775eeb3b23d459f8eab241f241e072b.webp,pro_hong_nhat_3_9c00f9ac9b3e4c1ca83fb280e2ea3e5a.webp,pro_hong_nhat_4_ac444a6049eb43c283062fee10a46e32.webp}	275000	5	2023-06-01 17:11:14.220101+07	2023-06-24 14:47:43.897916+07	\N
293	37	8	2	crop415334mlpik	pro_hong_nhat_1_bef80eec522447a0b288f007e364353d.webp	{pro_hong_nhat_1_bef80eec522447a0b288f007e364353d.webp,pro_hong_nhat_2_d775eeb3b23d459f8eab241f241e072b.webp,pro_hong_nhat_3_9c00f9ac9b3e4c1ca83fb280e2ea3e5a.webp,pro_hong_nhat_4_ac444a6049eb43c283062fee10a46e32.webp}	275000	5	2023-06-01 17:11:15.859323+07	2023-06-24 14:47:43.897916+07	\N
294	37	8	3	crop415334llpik	pro_hong_nhat_1_bef80eec522447a0b288f007e364353d.webp	{pro_hong_nhat_1_bef80eec522447a0b288f007e364353d.webp,pro_hong_nhat_2_d775eeb3b23d459f8eab241f241e072b.webp,pro_hong_nhat_3_9c00f9ac9b3e4c1ca83fb280e2ea3e5a.webp,pro_hong_nhat_4_ac444a6049eb43c283062fee10a46e32.webp}	275000	5	2023-06-01 17:11:17.649622+07	2023-06-24 14:47:43.897916+07	\N
295	38	10	1	crop697804slipik	pro_hong_1_8bcd382fabc74ac28806daa9ba65760e.webp	{pro_hong_1_8bcd382fabc74ac28806daa9ba65760e.webp,pro_hong_2_dde07bf3efcd47fc810c8cca772b7a67.webp,pro_hong_3_3de6c4a4a19740f4a57e283d5bc8c266.webp,pro_hong_5_4f720af361984fbf90f034dcf45ff734.webp}	655000	52	2023-06-01 17:13:31.976537+07	2023-06-24 14:47:43.897916+07	\N
296	38	10	2	crop697804mlipik	pro_hong_1_8bcd382fabc74ac28806daa9ba65760e.webp	{pro_hong_1_8bcd382fabc74ac28806daa9ba65760e.webp,pro_hong_2_dde07bf3efcd47fc810c8cca772b7a67.webp,pro_hong_3_3de6c4a4a19740f4a57e283d5bc8c266.webp,pro_hong_5_4f720af361984fbf90f034dcf45ff734.webp}	655000	45	2023-06-01 17:13:36.456214+07	2023-06-24 14:47:43.897916+07	\N
297	38	10	3	crop697804llipik	pro_hong_1_8bcd382fabc74ac28806daa9ba65760e.webp	{pro_hong_1_8bcd382fabc74ac28806daa9ba65760e.webp,pro_hong_2_dde07bf3efcd47fc810c8cca772b7a67.webp,pro_hong_3_3de6c4a4a19740f4a57e283d5bc8c266.webp,pro_hong_5_4f720af361984fbf90f034dcf45ff734.webp}	655000	42	2023-06-01 17:13:40.08562+07	2023-06-24 14:47:43.897916+07	\N
298	38	3	1	crop697804sblue	pro_xanh_duong_1_835fe55be3364b65bb3c45f66af4c5c1.webp	{pro_xanh_duong_1_835fe55be3364b65bb3c45f66af4c5c1.webp,pro_xanh_duong_2_93a97dcd584745f6ac84226410d1045a.webp,pro_xanh_duong_3_3e08383547864b5c99e9fcb066867468.webp,pro_xanh_duong_4_e0e1ceea245e4cbdb6ca0b5a67e4a8f6.webp}	655000	42	2023-06-01 17:14:31.397788+07	2023-06-24 14:47:43.897916+07	\N
299	38	3	2	crop697804mblue	pro_xanh_duong_1_835fe55be3364b65bb3c45f66af4c5c1.webp	{pro_xanh_duong_1_835fe55be3364b65bb3c45f66af4c5c1.webp,pro_xanh_duong_2_93a97dcd584745f6ac84226410d1045a.webp,pro_xanh_duong_3_3e08383547864b5c99e9fcb066867468.webp,pro_xanh_duong_4_e0e1ceea245e4cbdb6ca0b5a67e4a8f6.webp}	655000	41	2023-06-01 17:14:34.555204+07	2023-06-24 14:47:43.897916+07	\N
300	38	3	3	crop697804lblue	pro_xanh_duong_1_835fe55be3364b65bb3c45f66af4c5c1.webp	{pro_xanh_duong_1_835fe55be3364b65bb3c45f66af4c5c1.webp,pro_xanh_duong_2_93a97dcd584745f6ac84226410d1045a.webp,pro_xanh_duong_3_3e08383547864b5c99e9fcb066867468.webp,pro_xanh_duong_4_e0e1ceea245e4cbdb6ca0b5a67e4a8f6.webp}	655000	45	2023-06-01 17:14:37.895416+07	2023-06-24 14:47:43.897916+07	\N
301	39	14	1	crop411376swhe	pro_vang_4_96c4d7e2203d4976af7e39ad5aec0eb6.webp	{pro_vang_4_96c4d7e2203d4976af7e39ad5aec0eb6.webp,pro_vang_3_21e48a6be62149ddb390e99774ca099a.webp,pro_vang_2_ce4fc2acb47646228c4badd2bc0924df.webp,pro_vang_1_290b3dad7ad4482d83b597938cbd4efc.webp}	255000	45	2023-06-01 17:20:48.501546+07	2023-06-24 14:47:43.897916+07	\N
302	39	14	2	crop411376mwhe	pro_vang_4_96c4d7e2203d4976af7e39ad5aec0eb6.webp	{pro_vang_4_96c4d7e2203d4976af7e39ad5aec0eb6.webp,pro_vang_3_21e48a6be62149ddb390e99774ca099a.webp,pro_vang_2_ce4fc2acb47646228c4badd2bc0924df.webp,pro_vang_1_290b3dad7ad4482d83b597938cbd4efc.webp}	255000	45	2023-06-01 17:20:51.339647+07	2023-06-24 14:47:43.897916+07	\N
303	39	14	3	crop411376lwhe	pro_vang_4_96c4d7e2203d4976af7e39ad5aec0eb6.webp	{pro_vang_4_96c4d7e2203d4976af7e39ad5aec0eb6.webp,pro_vang_3_21e48a6be62149ddb390e99774ca099a.webp,pro_vang_2_ce4fc2acb47646228c4badd2bc0924df.webp,pro_vang_1_290b3dad7ad4482d83b597938cbd4efc.webp}	255000	2	2023-06-01 17:20:54.509218+07	2023-06-24 14:47:43.897916+07	\N
304	39	11	1	crop411376svani	pro_nau_4_4768f4d399d24a92bd371cf6892de0cc.webp	{pro_nau_4_4768f4d399d24a92bd371cf6892de0cc.webp,pro_nau_3_608c8fe8c2d24afca4e1531661d6e1dd.webp,pro_nau_2_7b9e9e0eaba24deba4541a73330e5c0f.webp,pro_nau_1_6a21dc73946143d989b9d026df3ebd81.webp}	255000	2	2023-06-01 17:21:54.220351+07	2023-06-24 14:47:43.897916+07	\N
305	39	11	2	crop411376mvani	pro_nau_4_4768f4d399d24a92bd371cf6892de0cc.webp	{pro_nau_4_4768f4d399d24a92bd371cf6892de0cc.webp,pro_nau_3_608c8fe8c2d24afca4e1531661d6e1dd.webp,pro_nau_2_7b9e9e0eaba24deba4541a73330e5c0f.webp,pro_nau_1_6a21dc73946143d989b9d026df3ebd81.webp}	255000	2	2023-06-01 17:21:56.328779+07	2023-06-24 14:47:43.897916+07	\N
306	39	11	3	crop411376lvani	pro_nau_4_4768f4d399d24a92bd371cf6892de0cc.webp	{pro_nau_4_4768f4d399d24a92bd371cf6892de0cc.webp,pro_nau_3_608c8fe8c2d24afca4e1531661d6e1dd.webp,pro_nau_2_7b9e9e0eaba24deba4541a73330e5c0f.webp,pro_nau_1_6a21dc73946143d989b9d026df3ebd81.webp}	255000	2	2023-06-01 17:21:59.450128+07	2023-06-24 14:47:43.897916+07	\N
307	39	2	1	crop411376sblk	pro_den_4_872d332544454981baa57aced624c711.webp	{pro_den_4_872d332544454981baa57aced624c711.webp,pro_den_3_af949980367c4f60b2b5ae4ae9c8fbc6.webp,pro_den_2_03daaa9c17f34b92bca45b4bcd834347.webp,pro_den_1_bb8cb69a928f46d2b4a30752844b1c3b.webp}	255000	12	2023-06-01 17:22:25.298883+07	2023-06-24 14:47:43.897916+07	\N
308	39	2	2	crop411376mblk	pro_den_4_872d332544454981baa57aced624c711.webp	{pro_den_4_872d332544454981baa57aced624c711.webp,pro_den_3_af949980367c4f60b2b5ae4ae9c8fbc6.webp,pro_den_2_03daaa9c17f34b92bca45b4bcd834347.webp,pro_den_1_bb8cb69a928f46d2b4a30752844b1c3b.webp}	255000	4	2023-06-01 17:22:28.578529+07	2023-06-24 14:47:43.897916+07	\N
309	39	2	3	crop411376lblk	pro_den_4_872d332544454981baa57aced624c711.webp	{pro_den_4_872d332544454981baa57aced624c711.webp,pro_den_3_af949980367c4f60b2b5ae4ae9c8fbc6.webp,pro_den_2_03daaa9c17f34b92bca45b4bcd834347.webp,pro_den_1_bb8cb69a928f46d2b4a30752844b1c3b.webp}	255000	47	2023-06-01 17:22:32.948336+07	2023-06-24 14:47:43.897916+07	\N
310	40	12	1	crop900039slblu	pro_lam_nhat_1_92ef5134617f45eb87d872620281bd2b.webp	{pro_lam_nhat_1_92ef5134617f45eb87d872620281bd2b.webp,pro_lam_nhat_2_9ceda238dfc54f71809443463d57e97b.webp,pro_lam_nhat_3_4dd202d2002c413faaa10d7353b9294a.webp,pro_lam_nhat_4_c208e4b712374f05bb01c4c17ac959f8.webp}	255000	47	2023-06-01 17:24:00.118059+07	2023-06-24 14:47:43.897916+07	\N
311	40	12	2	crop900039mlblu	pro_lam_nhat_1_92ef5134617f45eb87d872620281bd2b.webp	{pro_lam_nhat_1_92ef5134617f45eb87d872620281bd2b.webp,pro_lam_nhat_2_9ceda238dfc54f71809443463d57e97b.webp,pro_lam_nhat_3_4dd202d2002c413faaa10d7353b9294a.webp,pro_lam_nhat_4_c208e4b712374f05bb01c4c17ac959f8.webp}	255000	22	2023-06-01 17:24:03.546311+07	2023-06-24 14:47:43.897916+07	\N
312	40	12	3	crop900039llblu	pro_lam_nhat_1_92ef5134617f45eb87d872620281bd2b.webp	{pro_lam_nhat_1_92ef5134617f45eb87d872620281bd2b.webp,pro_lam_nhat_2_9ceda238dfc54f71809443463d57e97b.webp,pro_lam_nhat_3_4dd202d2002c413faaa10d7353b9294a.webp,pro_lam_nhat_4_c208e4b712374f05bb01c4c17ac959f8.webp}	255000	46	2023-06-01 17:24:06.886141+07	2023-06-24 14:47:43.897916+07	\N
322	42	10	1	crop816791slipik	pro_hong_1_89851d6584734c5b9ee80c522a0b72f6.webp	{pro_hong_1_89851d6584734c5b9ee80c522a0b72f6.webp,pro_hong_2_05c9555a4b0a41ea84557afb10fb66f0.webp,pro_hong_3_4a51f7bd6f4547cfb0ab9e1a78fad9b0.webp,pro_hong_4_98ea995923be414c91796a95dc32103f.webp}	295000	11	2023-06-01 17:35:35.621922+07	2023-06-24 14:47:43.897916+07	\N
323	42	10	2	crop816791mlipik	pro_hong_1_89851d6584734c5b9ee80c522a0b72f6.webp	{pro_hong_1_89851d6584734c5b9ee80c522a0b72f6.webp,pro_hong_2_05c9555a4b0a41ea84557afb10fb66f0.webp,pro_hong_3_4a51f7bd6f4547cfb0ab9e1a78fad9b0.webp,pro_hong_4_98ea995923be414c91796a95dc32103f.webp}	295000	11	2023-06-01 17:35:38.58171+07	2023-06-24 14:47:43.897916+07	\N
324	42	10	3	crop816791llipik	pro_hong_1_89851d6584734c5b9ee80c522a0b72f6.webp	{pro_hong_1_89851d6584734c5b9ee80c522a0b72f6.webp,pro_hong_2_05c9555a4b0a41ea84557afb10fb66f0.webp,pro_hong_3_4a51f7bd6f4547cfb0ab9e1a78fad9b0.webp,pro_hong_4_98ea995923be414c91796a95dc32103f.webp}	295000	13	2023-06-01 17:35:42.771834+07	2023-06-24 14:47:43.897916+07	\N
325	43	6	1	crop422254swht	pro_trang_1_0f58a7c2670146bdb6c92a49bae8fb4c.webp	{pro_trang_1_0f58a7c2670146bdb6c92a49bae8fb4c.webp,pro_trang_2_4b54756350df4fc48b55a2e8a96a407f.webp,pro_trang_3_01adbec71b9f4689a309aae226724a2f.webp,pro_trang_4_4d75079fdb62448988434b6e0f72dc91.webp}	555000	13	2023-06-01 17:44:10.408036+07	2023-06-24 14:47:43.897916+07	\N
326	43	6	2	crop422254mwht	pro_trang_1_0f58a7c2670146bdb6c92a49bae8fb4c.webp	{pro_trang_1_0f58a7c2670146bdb6c92a49bae8fb4c.webp,pro_trang_2_4b54756350df4fc48b55a2e8a96a407f.webp,pro_trang_3_01adbec71b9f4689a309aae226724a2f.webp,pro_trang_4_4d75079fdb62448988434b6e0f72dc91.webp}	555000	13	2023-06-01 17:44:12.577195+07	2023-06-24 14:47:43.897916+07	\N
327	43	6	3	crop422254lwht	pro_trang_1_0f58a7c2670146bdb6c92a49bae8fb4c.webp	{pro_trang_1_0f58a7c2670146bdb6c92a49bae8fb4c.webp,pro_trang_2_4b54756350df4fc48b55a2e8a96a407f.webp,pro_trang_3_01adbec71b9f4689a309aae226724a2f.webp,pro_trang_4_4d75079fdb62448988434b6e0f72dc91.webp}	555000	12	2023-06-01 17:44:16.077147+07	2023-06-24 14:47:43.897916+07	\N
328	43	2	1	crop422254sblk	pro_den_1_5622c0a8f2dd4b96a6eacaee54b051c3.webp	{pro_den_1_5622c0a8f2dd4b96a6eacaee54b051c3.webp,pro_den_2_1823add5b713429a817eb7afe605c3aa.webp,pro_den_3_c27a594bd6904135bdfd5180266be48e.webp,pro_den_4_25e5892733de4f7f91f2f18fd32a2824.webp}	555000	12	2023-06-01 17:44:45.666884+07	2023-06-24 14:47:43.897916+07	\N
329	43	2	2	crop422254mblk	pro_den_1_5622c0a8f2dd4b96a6eacaee54b051c3.webp	{pro_den_1_5622c0a8f2dd4b96a6eacaee54b051c3.webp,pro_den_2_1823add5b713429a817eb7afe605c3aa.webp,pro_den_3_c27a594bd6904135bdfd5180266be48e.webp,pro_den_4_25e5892733de4f7f91f2f18fd32a2824.webp}	555000	14	2023-06-01 17:44:49.036794+07	2023-06-24 14:47:43.897916+07	\N
330	43	2	3	crop422254lblk	pro_den_1_5622c0a8f2dd4b96a6eacaee54b051c3.webp	{pro_den_1_5622c0a8f2dd4b96a6eacaee54b051c3.webp,pro_den_2_1823add5b713429a817eb7afe605c3aa.webp,pro_den_3_c27a594bd6904135bdfd5180266be48e.webp,pro_den_4_25e5892733de4f7f91f2f18fd32a2824.webp}	555000	2	2023-06-01 17:44:52.716876+07	2023-06-24 14:47:43.897916+07	\N
331	43	18	1	crop422254sdvani	pro_da_1_c0f9f5257175425996fd0be4007d42a4.webp	{pro_da_1_c0f9f5257175425996fd0be4007d42a4.webp,pro_da_2_d703a056b81340e7874ca061e6c8d1c0.webp,pro_da_3_ca0c2f1b11254560bae8a08bdea693f1.webp,pro_da_4_5841546267ac4576857781f1403ed167.webp}	555000	2	2023-06-01 17:45:25.256747+07	2023-06-24 14:47:43.897916+07	\N
332	43	18	2	crop422254mdvani	pro_da_1_c0f9f5257175425996fd0be4007d42a4.webp	{pro_da_1_c0f9f5257175425996fd0be4007d42a4.webp,pro_da_2_d703a056b81340e7874ca061e6c8d1c0.webp,pro_da_3_ca0c2f1b11254560bae8a08bdea693f1.webp,pro_da_4_5841546267ac4576857781f1403ed167.webp}	555000	62	2023-06-01 17:45:33.306365+07	2023-06-24 14:47:43.897916+07	\N
333	43	18	3	crop422254ldvani	pro_da_1_c0f9f5257175425996fd0be4007d42a4.webp	{pro_da_1_c0f9f5257175425996fd0be4007d42a4.webp,pro_da_2_d703a056b81340e7874ca061e6c8d1c0.webp,pro_da_3_ca0c2f1b11254560bae8a08bdea693f1.webp,pro_da_4_5841546267ac4576857781f1403ed167.webp}	555000	34	2023-06-01 17:45:40.457802+07	2023-06-24 14:47:43.897916+07	\N
334	44	11	1	blou391774svani	pro_kem_1_9d10f8bd644f4a5db9d73264b6efddd6.webp	{pro_kem_1_9d10f8bd644f4a5db9d73264b6efddd6.webp,pro_kem_2_6cb5c72945f3465da7ee0e95a088c7f7.webp,pro_kem_3_279a0fcda1c342cca4d51d46ffed41cf.webp,pro_kem_4_27d455788ef24dddb73a6d38f0efe63c.webp}	555000	12	2023-06-01 17:52:51.044752+07	2023-06-24 14:47:43.897916+07	\N
335	44	11	2	blou391774mvani	pro_kem_1_9d10f8bd644f4a5db9d73264b6efddd6.webp	{pro_kem_1_9d10f8bd644f4a5db9d73264b6efddd6.webp,pro_kem_2_6cb5c72945f3465da7ee0e95a088c7f7.webp,pro_kem_3_279a0fcda1c342cca4d51d46ffed41cf.webp,pro_kem_4_27d455788ef24dddb73a6d38f0efe63c.webp}	555000	12	2023-06-01 17:52:54.943632+07	2023-06-24 14:47:43.897916+07	\N
336	44	11	3	blou391774lvani	pro_kem_1_9d10f8bd644f4a5db9d73264b6efddd6.webp	{pro_kem_1_9d10f8bd644f4a5db9d73264b6efddd6.webp,pro_kem_2_6cb5c72945f3465da7ee0e95a088c7f7.webp,pro_kem_3_279a0fcda1c342cca4d51d46ffed41cf.webp,pro_kem_4_27d455788ef24dddb73a6d38f0efe63c.webp}	555000	16	2023-06-01 17:52:59.263476+07	2023-06-24 14:47:43.897916+07	\N
337	45	3	1	blou982159sblue	pro_xanh_duong_1_5794d2f5b44749b1959264b8bedb33e7.webp	{pro_xanh_duong_1_5794d2f5b44749b1959264b8bedb33e7.webp,pro_xanh_duong_2_db77a36c41b94761ae3978e6c94ed5c7.webp,pro_xanh_duong_3_c25d5cc83f104a92b61af04213e2acd6.webp,pro_xanh_duong_4_e24bc1d770e148389546b05d3066f50b.webp}	555000	16	2023-06-01 17:55:04.286482+07	2023-06-24 14:47:43.897916+07	\N
338	45	3	2	blou982159mblue	pro_xanh_duong_1_5794d2f5b44749b1959264b8bedb33e7.webp	{pro_xanh_duong_1_5794d2f5b44749b1959264b8bedb33e7.webp,pro_xanh_duong_2_db77a36c41b94761ae3978e6c94ed5c7.webp,pro_xanh_duong_3_c25d5cc83f104a92b61af04213e2acd6.webp,pro_xanh_duong_4_e24bc1d770e148389546b05d3066f50b.webp}	555000	16	2023-06-01 17:55:06.173442+07	2023-06-24 14:47:43.897916+07	\N
339	45	3	3	blou982159lblue	pro_xanh_duong_1_5794d2f5b44749b1959264b8bedb33e7.webp	{pro_xanh_duong_1_5794d2f5b44749b1959264b8bedb33e7.webp,pro_xanh_duong_2_db77a36c41b94761ae3978e6c94ed5c7.webp,pro_xanh_duong_3_c25d5cc83f104a92b61af04213e2acd6.webp,pro_xanh_duong_4_e24bc1d770e148389546b05d3066f50b.webp}	555000	17	2023-06-01 17:55:09.785489+07	2023-06-24 14:47:43.897916+07	\N
340	46	2	1	blou598148sblk	pro_den_1_5ab1c3dbc72b4d04914ed3b5064915e4.webp	{pro_den_1_5ab1c3dbc72b4d04914ed3b5064915e4.webp,pro_den_2_848a45b2c9fa4679908d482a0e554ce3.webp,pro_den_3_4fd2f0da5d0c461a9bc88dbd6a025526.webp,pro_den_4_7bb9ffe5255841fca5a90a04cf647cad.webp}	755000	17	2023-06-01 17:57:54.054515+07	2023-06-24 14:47:43.897916+07	\N
341	46	2	2	blou598148mblk	pro_den_1_5ab1c3dbc72b4d04914ed3b5064915e4.webp	{pro_den_1_5ab1c3dbc72b4d04914ed3b5064915e4.webp,pro_den_2_848a45b2c9fa4679908d482a0e554ce3.webp,pro_den_3_4fd2f0da5d0c461a9bc88dbd6a025526.webp,pro_den_4_7bb9ffe5255841fca5a90a04cf647cad.webp}	755000	17	2023-06-01 17:57:57.403713+07	2023-06-24 14:47:43.897916+07	\N
342	46	2	3	blou598148lblk	pro_den_1_5ab1c3dbc72b4d04914ed3b5064915e4.webp	{pro_den_1_5ab1c3dbc72b4d04914ed3b5064915e4.webp,pro_den_2_848a45b2c9fa4679908d482a0e554ce3.webp,pro_den_3_4fd2f0da5d0c461a9bc88dbd6a025526.webp,pro_den_4_7bb9ffe5255841fca5a90a04cf647cad.webp}	755000	22	2023-06-01 17:58:00.933595+07	2023-06-24 14:47:43.897916+07	\N
344	46	3	2	blou598148mblue	pro_xanh_duong_1_ad38468c86ab4361a5875475467054de.webp	{pro_xanh_duong_1_ad38468c86ab4361a5875475467054de.webp,pro_xanh_duong_2_c1ff02874fc24b75986ffcc1355dd2ca.webp,pro_xanh_duong_3_502b380540b945b9b1e97385a7c3bf99.webp,pro_xanh_duong_4_a09e8db86b084f409ce3ed46e37a2689.webp}	755000	11	2023-06-01 17:58:18.014145+07	2023-06-24 14:47:43.897916+07	\N
345	46	3	3	blou598148lblue	pro_xanh_duong_1_ad38468c86ab4361a5875475467054de.webp	{pro_xanh_duong_1_ad38468c86ab4361a5875475467054de.webp,pro_xanh_duong_2_c1ff02874fc24b75986ffcc1355dd2ca.webp,pro_xanh_duong_3_502b380540b945b9b1e97385a7c3bf99.webp,pro_xanh_duong_4_a09e8db86b084f409ce3ed46e37a2689.webp}	755000	45	2023-06-01 17:58:21.205609+07	2023-06-24 14:47:43.897916+07	\N
346	47	7	1	blou464030slgre	pro_xanh_la_1_5059967e011b4f7eb8c767cad2d26508.webp	{pro_xanh_la_1_5059967e011b4f7eb8c767cad2d26508.webp,pro_xanh_la_2_2a086d4ef4554d6684ae162ee3e8f912.webp,pro_xanh_la_4_4c734c0526f04bb38df59f3f366563ba.webp,pro_xanh_la_3_a47f5a2a2d2f41488345483ce4245efb.webp}	455000	45	2023-06-01 18:01:27.154422+07	2023-06-24 14:47:43.897916+07	\N
347	47	7	2	blou464030mlgre	pro_xanh_la_1_5059967e011b4f7eb8c767cad2d26508.webp	{pro_xanh_la_1_5059967e011b4f7eb8c767cad2d26508.webp,pro_xanh_la_2_2a086d4ef4554d6684ae162ee3e8f912.webp,pro_xanh_la_4_4c734c0526f04bb38df59f3f366563ba.webp,pro_xanh_la_3_a47f5a2a2d2f41488345483ce4245efb.webp}	455000	12	2023-06-01 18:01:31.132815+07	2023-06-24 14:47:43.897916+07	\N
348	47	7	3	blou464030llgre	pro_xanh_la_1_5059967e011b4f7eb8c767cad2d26508.webp	{pro_xanh_la_1_5059967e011b4f7eb8c767cad2d26508.webp,pro_xanh_la_2_2a086d4ef4554d6684ae162ee3e8f912.webp,pro_xanh_la_4_4c734c0526f04bb38df59f3f366563ba.webp,pro_xanh_la_3_a47f5a2a2d2f41488345483ce4245efb.webp}	455000	65	2023-06-01 18:01:34.77286+07	2023-06-24 14:47:43.897916+07	\N
350	48	6	2	polo664398mwht	pro_trang_1_39a6bc9de59c490e9e6f723a8b0f20de.webp	{pro_trang_1_39a6bc9de59c490e9e6f723a8b0f20de.webp,pro_trang_2_36e4bdc1d8854cd7b81689770c05f1ea.webp,pro_trang_3_83ce35f5104f4b35ab32a4df657f9ebb.webp,pro_trang_4_ac2b2515b52f44319f009ad3c3c36c27.webp}	225000	15	2023-06-01 18:08:02.416747+07	2023-06-24 14:47:43.897916+07	\N
351	48	6	3	polo664398lwht	pro_trang_1_39a6bc9de59c490e9e6f723a8b0f20de.webp	{pro_trang_1_39a6bc9de59c490e9e6f723a8b0f20de.webp,pro_trang_2_36e4bdc1d8854cd7b81689770c05f1ea.webp,pro_trang_3_83ce35f5104f4b35ab32a4df657f9ebb.webp,pro_trang_4_ac2b2515b52f44319f009ad3c3c36c27.webp}	225000	16	2023-06-01 18:08:06.246063+07	2023-06-24 14:47:43.897916+07	\N
356	49	2	2	polo660719mblk	pro_den_1_13db3effa4714f0ba78dc75051f92fba.webp	{pro_den_1_13db3effa4714f0ba78dc75051f92fba.webp,pro_den_2_b0d81fda9dcd4475a610fd12f76a7fab.webp,pro_den_3_7aff42e13bf949cd9f06a1fed64cecb1.webp,pro_den_4_427aaa78e24341a5991d9ef2f163e8a9.webp}	225000	12	2023-06-01 18:14:38.301402+07	2023-06-24 14:47:43.897916+07	\N
357	49	2	3	polo660719lblk	pro_den_1_13db3effa4714f0ba78dc75051f92fba.webp	{pro_den_1_13db3effa4714f0ba78dc75051f92fba.webp,pro_den_2_b0d81fda9dcd4475a610fd12f76a7fab.webp,pro_den_3_7aff42e13bf949cd9f06a1fed64cecb1.webp,pro_den_4_427aaa78e24341a5991d9ef2f163e8a9.webp}	225000	14	2023-06-01 18:14:41.260522+07	2023-06-24 14:47:43.897916+07	\N
359	49	6	2	polo660719mwht	pro_trang_1_b486c83be6e14ddda23d6d85e74d7130.webp	{pro_trang_1_b486c83be6e14ddda23d6d85e74d7130.webp,pro_trang_2_9fb041a92b6d4e1aa1e0e56b9eb05d42.webp,pro_trang_3_ad05e2c7a16148bfbd74d1f1a9112171.webp,pro_trang_4_c2198c0cda5444648eb3a40f5fd3a902.webp}	225000	14	2023-06-01 18:15:23.490769+07	2023-06-24 14:47:43.897916+07	\N
360	49	6	3	polo660719lwht	pro_trang_1_b486c83be6e14ddda23d6d85e74d7130.webp	{pro_trang_1_b486c83be6e14ddda23d6d85e74d7130.webp,pro_trang_2_9fb041a92b6d4e1aa1e0e56b9eb05d42.webp,pro_trang_3_ad05e2c7a16148bfbd74d1f1a9112171.webp,pro_trang_4_c2198c0cda5444648eb3a40f5fd3a902.webp}	225000	16	2023-06-01 18:15:26.929751+07	2023-06-24 14:47:43.897916+07	\N
362	49	12	2	polo660719mlblu	pro_xanh_duong_nhat_1_dd9d4e52e4414a03ac70069b2deb87eb.webp	{pro_xanh_duong_nhat_1_dd9d4e52e4414a03ac70069b2deb87eb.webp,pro_xanh_duong_nhat_2_5232e3696d504161b0a831ba0585c2c2.webp,pro_xanh_duong_nhat_3_da943ddf1c4842d4b62818564b0c155d.webp,pro_xanh_duong_nhat_4_0188c0eae74c46fe88072bb526225b23.webp}	225000	11	2023-06-01 18:16:08.680145+07	2023-06-24 14:47:43.897916+07	\N
352	48	10	1	polo664398slipik	pro_hong_1_1a347ce6cb904ae4bfbd82efa2a5cd95.webp	{pro_hong_1_1a347ce6cb904ae4bfbd82efa2a5cd95.webp,pro_hong_2_7222674cfaaa4e9b803d28545f422935.webp,pro_hong_3_0f22e1de60054708951b4b600ea86d0f.webp,pro_hong_4_f54dbdb57b20498fbfe2d67ab9f06327.webp}	225000	15	2023-06-01 18:08:33.765726+07	2023-06-24 14:47:43.897916+07	\N
353	48	10	2	polo664398mlipik	pro_hong_1_1a347ce6cb904ae4bfbd82efa2a5cd95.webp	{pro_hong_1_1a347ce6cb904ae4bfbd82efa2a5cd95.webp,pro_hong_2_7222674cfaaa4e9b803d28545f422935.webp,pro_hong_3_0f22e1de60054708951b4b600ea86d0f.webp,pro_hong_4_f54dbdb57b20498fbfe2d67ab9f06327.webp}	225000	15	2023-06-01 18:08:35.605247+07	2023-06-24 14:47:43.897916+07	\N
354	48	10	3	polo664398llipik	pro_hong_1_1a347ce6cb904ae4bfbd82efa2a5cd95.webp	{pro_hong_1_1a347ce6cb904ae4bfbd82efa2a5cd95.webp,pro_hong_2_7222674cfaaa4e9b803d28545f422935.webp,pro_hong_3_0f22e1de60054708951b4b600ea86d0f.webp,pro_hong_4_f54dbdb57b20498fbfe2d67ab9f06327.webp}	225000	16	2023-06-01 18:08:41.81497+07	2023-06-24 14:47:43.897916+07	\N
355	49	2	1	polo660719sblk	pro_den_1_13db3effa4714f0ba78dc75051f92fba.webp	{pro_den_1_13db3effa4714f0ba78dc75051f92fba.webp,pro_den_2_b0d81fda9dcd4475a610fd12f76a7fab.webp,pro_den_3_7aff42e13bf949cd9f06a1fed64cecb1.webp,pro_den_4_427aaa78e24341a5991d9ef2f163e8a9.webp}	225000	16	2023-06-01 18:14:34.331266+07	2023-06-24 14:47:43.897916+07	\N
358	49	6	1	polo660719swht	pro_trang_1_b486c83be6e14ddda23d6d85e74d7130.webp	{pro_trang_1_b486c83be6e14ddda23d6d85e74d7130.webp,pro_trang_2_9fb041a92b6d4e1aa1e0e56b9eb05d42.webp,pro_trang_3_ad05e2c7a16148bfbd74d1f1a9112171.webp,pro_trang_4_c2198c0cda5444648eb3a40f5fd3a902.webp}	225000	13	2023-06-01 18:15:21.639756+07	2023-06-24 14:47:43.897916+07	\N
361	49	12	1	polo660719slblu	pro_xanh_duong_nhat_1_dd9d4e52e4414a03ac70069b2deb87eb.webp	{pro_xanh_duong_nhat_1_dd9d4e52e4414a03ac70069b2deb87eb.webp,pro_xanh_duong_nhat_2_5232e3696d504161b0a831ba0585c2c2.webp,pro_xanh_duong_nhat_3_da943ddf1c4842d4b62818564b0c155d.webp,pro_xanh_duong_nhat_4_0188c0eae74c46fe88072bb526225b23.webp}	225000	15	2023-06-01 18:16:04.370484+07	2023-06-24 14:47:43.897916+07	\N
363	49	12	3	polo660719llblu	pro_xanh_duong_nhat_1_dd9d4e52e4414a03ac70069b2deb87eb.webp	{pro_xanh_duong_nhat_1_dd9d4e52e4414a03ac70069b2deb87eb.webp,pro_xanh_duong_nhat_2_5232e3696d504161b0a831ba0585c2c2.webp,pro_xanh_duong_nhat_3_da943ddf1c4842d4b62818564b0c155d.webp,pro_xanh_duong_nhat_4_0188c0eae74c46fe88072bb526225b23.webp}	225000	21	2023-06-01 18:16:12.080043+07	2023-06-24 14:47:43.897916+07	\N
364	50	19	1	polo320962slgry	pro_xam_4_15eb95bf0a7a45c3978ce9bab1cd839c.webp	{pro_xam_4_15eb95bf0a7a45c3978ce9bab1cd839c.webp,pro_xam_3_91dbaa3c745444acbb07122f55db18e3.webp,pro_xam_2_eefc106ec9704868bdb87a0e7d71c238.webp,pro_xam_1_8c928d714851419d927817d755c437a1.webp}	225000	21	2023-06-01 18:21:27.136535+07	2023-06-24 14:47:43.897916+07	\N
365	50	19	2	polo320962mlgry	pro_xam_4_15eb95bf0a7a45c3978ce9bab1cd839c.webp	{pro_xam_4_15eb95bf0a7a45c3978ce9bab1cd839c.webp,pro_xam_3_91dbaa3c745444acbb07122f55db18e3.webp,pro_xam_2_eefc106ec9704868bdb87a0e7d71c238.webp,pro_xam_1_8c928d714851419d927817d755c437a1.webp}	225000	11	2023-06-01 18:21:32.946295+07	2023-06-24 14:47:43.897916+07	\N
366	50	19	3	polo320962llgry	pro_xam_4_15eb95bf0a7a45c3978ce9bab1cd839c.webp	{pro_xam_4_15eb95bf0a7a45c3978ce9bab1cd839c.webp,pro_xam_3_91dbaa3c745444acbb07122f55db18e3.webp,pro_xam_2_eefc106ec9704868bdb87a0e7d71c238.webp,pro_xam_1_8c928d714851419d927817d755c437a1.webp}	225000	13	2023-06-01 18:21:36.236372+07	2023-06-24 14:47:43.897916+07	\N
367	50	2	1	polo320962sblk	pro_den_1_0f8051b899484ceaa049fa03242cc502.webp	{pro_den_1_0f8051b899484ceaa049fa03242cc502.webp,pro_den_2_89bb1a288b4b4218b0cc6fdf34555143.webp,pro_den_3_4a6ec847dee24ea89d25a17866b015ee.webp,pro_den_4_35945cb6fcce44a595505afd7812b94d.webp}	225000	13	2023-06-01 18:22:22.115333+07	2023-06-24 14:47:43.897916+07	\N
368	50	2	2	polo320962mblk	pro_den_1_0f8051b899484ceaa049fa03242cc502.webp	{pro_den_1_0f8051b899484ceaa049fa03242cc502.webp,pro_den_2_89bb1a288b4b4218b0cc6fdf34555143.webp,pro_den_3_4a6ec847dee24ea89d25a17866b015ee.webp,pro_den_4_35945cb6fcce44a595505afd7812b94d.webp}	225000	13	2023-06-01 18:22:25.045535+07	2023-06-24 14:47:43.897916+07	\N
369	50	2	3	polo320962lblk	pro_den_1_0f8051b899484ceaa049fa03242cc502.webp	{pro_den_1_0f8051b899484ceaa049fa03242cc502.webp,pro_den_2_89bb1a288b4b4218b0cc6fdf34555143.webp,pro_den_3_4a6ec847dee24ea89d25a17866b015ee.webp,pro_den_4_35945cb6fcce44a595505afd7812b94d.webp}	225000	13	2023-06-01 18:22:26.585302+07	2023-06-24 14:47:43.897916+07	\N
370	50	10	1	polo320962slipik	pro_hong_nhat_1_b4472aade14449e8b22008ed3c60b685.webp	{pro_hong_nhat_1_b4472aade14449e8b22008ed3c60b685.webp,pro_hong_nhat_2_3f2368e92abc436c921dd084b169e072.webp,pro_hong_nhat_3_691c4305a2664e5d98d16f4fac1090ea.webp,pro_hong_nhat_4_b3ae8ea2d8254dc7a86477dc499224aa.webp}	225000	13	2023-06-01 18:22:39.045782+07	2023-06-24 14:47:43.897916+07	\N
371	50	10	2	polo320962mlipik	pro_hong_nhat_1_b4472aade14449e8b22008ed3c60b685.webp	{pro_hong_nhat_1_b4472aade14449e8b22008ed3c60b685.webp,pro_hong_nhat_2_3f2368e92abc436c921dd084b169e072.webp,pro_hong_nhat_3_691c4305a2664e5d98d16f4fac1090ea.webp,pro_hong_nhat_4_b3ae8ea2d8254dc7a86477dc499224aa.webp}	225000	23	2023-06-01 18:22:45.964494+07	2023-06-24 14:47:43.897916+07	\N
372	50	10	3	polo320962llipik	pro_hong_nhat_1_b4472aade14449e8b22008ed3c60b685.webp	{pro_hong_nhat_1_b4472aade14449e8b22008ed3c60b685.webp,pro_hong_nhat_2_3f2368e92abc436c921dd084b169e072.webp,pro_hong_nhat_3_691c4305a2664e5d98d16f4fac1090ea.webp,pro_hong_nhat_4_b3ae8ea2d8254dc7a86477dc499224aa.webp}	225000	2	2023-06-01 18:22:48.744558+07	2023-06-24 14:47:43.897916+07	\N
373	50	6	1	polo320962swht	pro_trang_1_30f7114267f1430a87ef959bbac7c28a.webp	{pro_trang_1_30f7114267f1430a87ef959bbac7c28a.webp,pro_trang_2_e0290f72765140858b696bede62fe199.webp,pro_trang_3_f3c1b14b7e254ad5b070d2a48cd18a78.webp,pro_trang_4_a597b06860a04418acaf386bed18c2b6.webp}	225000	21	2023-06-01 18:23:04.950081+07	2023-06-24 14:47:43.897916+07	\N
374	50	6	2	polo320962mwht	pro_trang_1_30f7114267f1430a87ef959bbac7c28a.webp	{pro_trang_1_30f7114267f1430a87ef959bbac7c28a.webp,pro_trang_2_e0290f72765140858b696bede62fe199.webp,pro_trang_3_f3c1b14b7e254ad5b070d2a48cd18a78.webp,pro_trang_4_a597b06860a04418acaf386bed18c2b6.webp}	225000	12	2023-06-01 18:23:08.894807+07	2023-06-24 14:47:43.897916+07	\N
375	50	6	3	polo320962lwht	pro_trang_1_30f7114267f1430a87ef959bbac7c28a.webp	{pro_trang_1_30f7114267f1430a87ef959bbac7c28a.webp,pro_trang_2_e0290f72765140858b696bede62fe199.webp,pro_trang_3_f3c1b14b7e254ad5b070d2a48cd18a78.webp,pro_trang_4_a597b06860a04418acaf386bed18c2b6.webp}	225000	14	2023-06-01 18:23:12.114378+07	2023-06-24 14:47:43.897916+07	\N
376	50	12	1	polo320962slblu	pro_xanh_duong_1_eac01a8a73a24dcd8f18d89a7b0f94e7.webp	{pro_xanh_duong_1_eac01a8a73a24dcd8f18d89a7b0f94e7.webp,pro_xanh_duong_2_dbba77b567864c93957d40af09bda034.webp,pro_xanh_duong_3_f41e0559dc2d4f61802c0416fd9755a5.webp,pro_xanh_duong_4_d9866899bce14fc192bd15c6d00ad88f.webp}	225000	14	2023-06-01 18:23:38.984645+07	2023-06-24 14:47:43.897916+07	\N
377	50	12	2	polo320962mlblu	pro_xanh_duong_1_eac01a8a73a24dcd8f18d89a7b0f94e7.webp	{pro_xanh_duong_1_eac01a8a73a24dcd8f18d89a7b0f94e7.webp,pro_xanh_duong_2_dbba77b567864c93957d40af09bda034.webp,pro_xanh_duong_3_f41e0559dc2d4f61802c0416fd9755a5.webp,pro_xanh_duong_4_d9866899bce14fc192bd15c6d00ad88f.webp}	225000	14	2023-06-01 18:23:41.673905+07	2023-06-24 14:47:43.897916+07	\N
378	50	12	3	polo320962llblu	pro_xanh_duong_1_eac01a8a73a24dcd8f18d89a7b0f94e7.webp	{pro_xanh_duong_1_eac01a8a73a24dcd8f18d89a7b0f94e7.webp,pro_xanh_duong_2_dbba77b567864c93957d40af09bda034.webp,pro_xanh_duong_3_f41e0559dc2d4f61802c0416fd9755a5.webp,pro_xanh_duong_4_d9866899bce14fc192bd15c6d00ad88f.webp}	225000	22	2023-06-01 18:23:45.643462+07	2023-06-24 14:47:43.897916+07	\N
379	51	6	1	polo749935swht	pro_trang_1_92aebd0dba75484287d6b5e2eb0f5d1e.webp	{pro_trang_1_92aebd0dba75484287d6b5e2eb0f5d1e.webp,pro_trang_2_2742b7d5044940839af088885328437d.webp,pro_trang_3_7b41170e97744923a2fcd1749650593e.webp,pro_trang_4_dba1949b4c9a411a82d340fe7edb64b4.webp}	195000	22	2023-06-01 18:28:05.130896+07	2023-06-24 14:47:43.897916+07	\N
380	51	6	2	polo749935mwht	pro_trang_1_92aebd0dba75484287d6b5e2eb0f5d1e.webp	{pro_trang_1_92aebd0dba75484287d6b5e2eb0f5d1e.webp,pro_trang_2_2742b7d5044940839af088885328437d.webp,pro_trang_3_7b41170e97744923a2fcd1749650593e.webp,pro_trang_4_dba1949b4c9a411a82d340fe7edb64b4.webp}	195000	22	2023-06-01 18:28:07.7505+07	2023-06-24 14:47:43.897916+07	\N
381	51	6	3	polo749935lwht	pro_trang_1_92aebd0dba75484287d6b5e2eb0f5d1e.webp	{pro_trang_1_92aebd0dba75484287d6b5e2eb0f5d1e.webp,pro_trang_2_2742b7d5044940839af088885328437d.webp,pro_trang_3_7b41170e97744923a2fcd1749650593e.webp,pro_trang_4_dba1949b4c9a411a82d340fe7edb64b4.webp}	195000	11	2023-06-01 18:28:13.140187+07	2023-06-24 14:47:43.897916+07	\N
382	51	8	1	polo749935slpik	pro_hong_nhat_1_555fddd708874b489fc06a90902f3fe1.webp	{pro_hong_nhat_1_555fddd708874b489fc06a90902f3fe1.webp,pro_hong_nhat_2_a2bfb3d90a3643f89fc04ef59dff96a0.webp,pro_hong_nhat_3_62356a9a762449559b224687f63096b8.webp,pro_hong_nhat_4_620597ff1f3745dbb76e344ab74de4d1.webp}	195000	11	2023-06-01 18:30:16.738319+07	2023-06-24 14:47:43.897916+07	\N
383	51	8	2	polo749935mlpik	pro_hong_nhat_1_555fddd708874b489fc06a90902f3fe1.webp	{pro_hong_nhat_1_555fddd708874b489fc06a90902f3fe1.webp,pro_hong_nhat_2_a2bfb3d90a3643f89fc04ef59dff96a0.webp,pro_hong_nhat_3_62356a9a762449559b224687f63096b8.webp,pro_hong_nhat_4_620597ff1f3745dbb76e344ab74de4d1.webp}	195000	15	2023-06-01 18:30:19.358933+07	2023-06-24 14:47:43.897916+07	\N
384	51	8	3	polo749935llpik	pro_hong_nhat_1_555fddd708874b489fc06a90902f3fe1.webp	{pro_hong_nhat_1_555fddd708874b489fc06a90902f3fe1.webp,pro_hong_nhat_2_a2bfb3d90a3643f89fc04ef59dff96a0.webp,pro_hong_nhat_3_62356a9a762449559b224687f63096b8.webp,pro_hong_nhat_4_620597ff1f3745dbb76e344ab74de4d1.webp}	195000	123	2023-06-01 18:30:23.97768+07	2023-06-24 14:47:43.897916+07	\N
385	51	2	1	polo749935sblk	pro_den_1_12c4684ad91148dbbc799386daa8caf6.webp	{pro_den_1_12c4684ad91148dbbc799386daa8caf6.webp,pro_den_2_0b4ee30bfe44434a845b266a14ef7270.webp,pro_den_3_1cda9bbfb892415192a25ca9fc0e212e.webp,pro_den_4_fd3ff11944194a0a8d0222d3d8b72039.webp}	195000	123	2023-06-01 18:30:50.227958+07	2023-06-24 14:47:43.897916+07	\N
386	51	2	2	polo749935mblk	pro_den_1_12c4684ad91148dbbc799386daa8caf6.webp	{pro_den_1_12c4684ad91148dbbc799386daa8caf6.webp,pro_den_2_0b4ee30bfe44434a845b266a14ef7270.webp,pro_den_3_1cda9bbfb892415192a25ca9fc0e212e.webp,pro_den_4_fd3ff11944194a0a8d0222d3d8b72039.webp}	195000	11	2023-06-01 18:30:54.397342+07	2023-06-24 14:47:43.897916+07	\N
387	51	2	3	polo749935lblk	pro_den_1_12c4684ad91148dbbc799386daa8caf6.webp	{pro_den_1_12c4684ad91148dbbc799386daa8caf6.webp,pro_den_2_0b4ee30bfe44434a845b266a14ef7270.webp,pro_den_3_1cda9bbfb892415192a25ca9fc0e212e.webp,pro_den_4_fd3ff11944194a0a8d0222d3d8b72039.webp}	195000	23	2023-06-01 18:30:59.317501+07	2023-06-24 14:47:43.897916+07	\N
388	51	13	1	polo749935sdgre	pro_xanh_la_1_4e8ed529da5c476ea0357c3a2f01bb1c.webp	{pro_xanh_la_1_4e8ed529da5c476ea0357c3a2f01bb1c.webp,pro_xanh_la_2_ad85d948544841f081d15ed05d43356b.webp,pro_xanh_la_3_ce69e46bc33948e597f558eaa3a08576.webp,pro_xanh_la_4_f4a540bc8f544a13a58c33064fd573a7.webp}	195000	23	2023-06-01 18:31:22.027054+07	2023-06-24 14:47:43.897916+07	\N
389	51	13	2	polo749935mdgre	pro_xanh_la_1_4e8ed529da5c476ea0357c3a2f01bb1c.webp	{pro_xanh_la_1_4e8ed529da5c476ea0357c3a2f01bb1c.webp,pro_xanh_la_2_ad85d948544841f081d15ed05d43356b.webp,pro_xanh_la_3_ce69e46bc33948e597f558eaa3a08576.webp,pro_xanh_la_4_f4a540bc8f544a13a58c33064fd573a7.webp}	195000	23	2023-06-01 18:31:24.616806+07	2023-06-24 14:47:43.897916+07	\N
390	51	13	3	polo749935ldgre	pro_xanh_la_1_4e8ed529da5c476ea0357c3a2f01bb1c.webp	{pro_xanh_la_1_4e8ed529da5c476ea0357c3a2f01bb1c.webp,pro_xanh_la_2_ad85d948544841f081d15ed05d43356b.webp,pro_xanh_la_3_ce69e46bc33948e597f558eaa3a08576.webp,pro_xanh_la_4_f4a540bc8f544a13a58c33064fd573a7.webp}	195000	12	2023-06-01 18:31:27.516782+07	2023-06-24 14:47:43.897916+07	\N
391	51	7	1	polo749935slgre	pro_xanh_la_nhat_1_42b4bc73bb9b4ebc8449ed05d679bd30.webp	{pro_xanh_la_nhat_1_42b4bc73bb9b4ebc8449ed05d679bd30.webp,pro_xanh_la_nhat_2_d0b530072d69490592dd1beef4004f70.webp,pro_xanh_la_nhat_3_a089b7d9b2a844d18b7c32999bdfdc88.webp,pro_xanh_la_nhat_4_57e8e96176174cdb99096eeb871fb326.webp}	195000	12	2023-06-01 18:31:50.257233+07	2023-06-24 14:47:43.897916+07	\N
392	51	7	2	polo749935mlgre	pro_xanh_la_nhat_1_42b4bc73bb9b4ebc8449ed05d679bd30.webp	{pro_xanh_la_nhat_1_42b4bc73bb9b4ebc8449ed05d679bd30.webp,pro_xanh_la_nhat_2_d0b530072d69490592dd1beef4004f70.webp,pro_xanh_la_nhat_3_a089b7d9b2a844d18b7c32999bdfdc88.webp,pro_xanh_la_nhat_4_57e8e96176174cdb99096eeb871fb326.webp}	195000	15	2023-06-01 18:31:52.886553+07	2023-06-24 14:47:43.897916+07	\N
393	51	7	3	polo749935llgre	pro_xanh_la_nhat_1_42b4bc73bb9b4ebc8449ed05d679bd30.webp	{pro_xanh_la_nhat_1_42b4bc73bb9b4ebc8449ed05d679bd30.webp,pro_xanh_la_nhat_2_d0b530072d69490592dd1beef4004f70.webp,pro_xanh_la_nhat_3_a089b7d9b2a844d18b7c32999bdfdc88.webp,pro_xanh_la_nhat_4_57e8e96176174cdb99096eeb871fb326.webp}	195000	52	2023-06-01 18:32:00.966988+07	2023-06-24 14:47:43.897916+07	\N
394	52	2	1	biki358512sblk	pro_den_1_f27e22d9a33f48d1bd5a9131a01f5bff.webp	{pro_den_1_f27e22d9a33f48d1bd5a9131a01f5bff.webp,pro_den_2_dea07b2460ba4c959c468fe18e60396b.webp,pro_den_3_1f291b8ac5c04298876390b1ee4cde0d.webp,pro_den_4_9918a55f3044479aa59c178c7c505582.webp}	545000	17	2023-06-01 18:39:08.420073+07	2023-06-24 14:47:43.897916+07	\N
395	52	2	2	biki358512mblk	pro_den_1_f27e22d9a33f48d1bd5a9131a01f5bff.webp	{pro_den_1_f27e22d9a33f48d1bd5a9131a01f5bff.webp,pro_den_2_dea07b2460ba4c959c468fe18e60396b.webp,pro_den_3_1f291b8ac5c04298876390b1ee4cde0d.webp,pro_den_4_9918a55f3044479aa59c178c7c505582.webp}	545000	17	2023-06-01 18:39:10.029662+07	2023-06-24 14:47:43.897916+07	\N
396	52	2	3	biki358512lblk	pro_den_1_f27e22d9a33f48d1bd5a9131a01f5bff.webp	{pro_den_1_f27e22d9a33f48d1bd5a9131a01f5bff.webp,pro_den_2_dea07b2460ba4c959c468fe18e60396b.webp,pro_den_3_1f291b8ac5c04298876390b1ee4cde0d.webp,pro_den_4_9918a55f3044479aa59c178c7c505582.webp}	545000	22	2023-06-01 18:39:14.079871+07	2023-06-24 14:47:43.897916+07	\N
397	52	15	1	biki358512sdred	pro_hong_dam_1_f4be245c632c4713b8ce96c88e8a4d99.webp	{pro_hong_dam_1_f4be245c632c4713b8ce96c88e8a4d99.webp,pro_hong_dam_2_99a759c3aa3e48f5abee9863f0099f9a.webp,pro_hong_dam_3_e18ed0388c9e43c3a3983b9eab83520f.webp,pro_hong_dam_4_aa24ae37ed1d4e94a409780d7a229f20.webp}	545000	22	2023-06-01 18:40:03.329326+07	2023-06-24 14:47:43.897916+07	\N
398	52	15	2	biki358512mdred	pro_hong_dam_1_f4be245c632c4713b8ce96c88e8a4d99.webp	{pro_hong_dam_1_f4be245c632c4713b8ce96c88e8a4d99.webp,pro_hong_dam_2_99a759c3aa3e48f5abee9863f0099f9a.webp,pro_hong_dam_3_e18ed0388c9e43c3a3983b9eab83520f.webp,pro_hong_dam_4_aa24ae37ed1d4e94a409780d7a229f20.webp}	545000	16	2023-06-01 18:40:10.018644+07	2023-06-24 14:47:43.897916+07	\N
399	52	15	3	biki358512ldred	pro_hong_dam_1_f4be245c632c4713b8ce96c88e8a4d99.webp	{pro_hong_dam_1_f4be245c632c4713b8ce96c88e8a4d99.webp,pro_hong_dam_2_99a759c3aa3e48f5abee9863f0099f9a.webp,pro_hong_dam_3_e18ed0388c9e43c3a3983b9eab83520f.webp,pro_hong_dam_4_aa24ae37ed1d4e94a409780d7a229f20.webp}	545000	18	2023-06-01 18:40:13.648894+07	2023-06-24 14:47:43.897916+07	\N
400	53	20	1	biki253874svio	pro_tim_1_fc38c98949884042abccf4f001b61f5c.webp	{pro_tim_1_fc38c98949884042abccf4f001b61f5c.webp,pro_tim_2_149d549a9d9640f8ad5be3e078bacaaa.webp,pro_tim_3_9187d62eab47419983acf70aa41d116f.webp,pro_tim_4_e546406491744d6d8229126e9ebd492c.webp}	545000	18	2023-06-01 18:43:59.60629+07	2023-06-24 14:47:43.897916+07	\N
401	53	20	2	biki253874mvio	pro_tim_1_fc38c98949884042abccf4f001b61f5c.webp	{pro_tim_1_fc38c98949884042abccf4f001b61f5c.webp,pro_tim_2_149d549a9d9640f8ad5be3e078bacaaa.webp,pro_tim_3_9187d62eab47419983acf70aa41d116f.webp,pro_tim_4_e546406491744d6d8229126e9ebd492c.webp}	545000	18	2023-06-01 18:44:01.316224+07	2023-06-24 14:47:43.897916+07	\N
402	53	20	3	biki253874lvio	pro_tim_1_fc38c98949884042abccf4f001b61f5c.webp	{pro_tim_1_fc38c98949884042abccf4f001b61f5c.webp,pro_tim_2_149d549a9d9640f8ad5be3e078bacaaa.webp,pro_tim_3_9187d62eab47419983acf70aa41d116f.webp,pro_tim_4_e546406491744d6d8229126e9ebd492c.webp}	545000	52	2023-06-01 18:44:05.326361+07	2023-06-24 14:47:43.897916+07	\N
403	53	2	1	biki253874sblk	pro_den_1_4f1840785e2045458e9b6bc83e7030a1.webp	{pro_den_1_4f1840785e2045458e9b6bc83e7030a1.webp,pro_den_2_a894533f9c474d86a39dfa47d378c97c.webp,pro_den_3_886ad845727b41de8f50a35478276528.webp,pro_den_4_1342b54db6bb4bc2a3fd7eb221b119b5.webp}	545000	52	2023-06-01 18:44:22.926221+07	2023-06-24 14:47:43.897916+07	\N
404	53	2	2	biki253874mblk	pro_den_1_4f1840785e2045458e9b6bc83e7030a1.webp	{pro_den_1_4f1840785e2045458e9b6bc83e7030a1.webp,pro_den_2_a894533f9c474d86a39dfa47d378c97c.webp,pro_den_3_886ad845727b41de8f50a35478276528.webp,pro_den_4_1342b54db6bb4bc2a3fd7eb221b119b5.webp}	545000	52	2023-06-01 18:44:24.615787+07	2023-06-24 14:47:43.897916+07	\N
405	53	2	3	biki253874lblk	pro_den_1_4f1840785e2045458e9b6bc83e7030a1.webp	{pro_den_1_4f1840785e2045458e9b6bc83e7030a1.webp,pro_den_2_a894533f9c474d86a39dfa47d378c97c.webp,pro_den_3_886ad845727b41de8f50a35478276528.webp,pro_den_4_1342b54db6bb4bc2a3fd7eb221b119b5.webp}	545000	12	2023-06-01 18:44:27.835661+07	2023-06-24 14:47:43.897916+07	\N
406	54	6	1	biki870283swht	pro_trang_1_7fddcdf95e964bca8c12803991f82dfa.webp	{pro_trang_1_7fddcdf95e964bca8c12803991f82dfa.webp,pro_trang_2_250534c0b818433a87dc4909b84f01e9.webp,pro_trang_3_0a0abb40256045e6a169d3b30fbc16e0.webp,pro_trang_4_62d0ccf6644045d4aa12d82bf6fa6254.webp}	545000	12	2023-06-01 18:45:41.767169+07	2023-06-24 14:47:43.897916+07	\N
407	54	6	2	biki870283mwht	pro_trang_1_7fddcdf95e964bca8c12803991f82dfa.webp	{pro_trang_1_7fddcdf95e964bca8c12803991f82dfa.webp,pro_trang_2_250534c0b818433a87dc4909b84f01e9.webp,pro_trang_3_0a0abb40256045e6a169d3b30fbc16e0.webp,pro_trang_4_62d0ccf6644045d4aa12d82bf6fa6254.webp}	545000	14	2023-06-01 18:45:45.20598+07	2023-06-24 14:47:43.897916+07	\N
408	54	6	3	biki870283lwht	pro_trang_1_7fddcdf95e964bca8c12803991f82dfa.webp	{pro_trang_1_7fddcdf95e964bca8c12803991f82dfa.webp,pro_trang_2_250534c0b818433a87dc4909b84f01e9.webp,pro_trang_3_0a0abb40256045e6a169d3b30fbc16e0.webp,pro_trang_4_62d0ccf6644045d4aa12d82bf6fa6254.webp}	545000	16	2023-06-01 18:45:49.225035+07	2023-06-24 14:47:43.897916+07	\N
409	55	15	1	biki687717sdred	pro_hong_dam_1_c332c0a019cd45e4a020ff66d78a5bde.webp	{pro_hong_dam_1_c332c0a019cd45e4a020ff66d78a5bde.webp,pro_hong_dam_2_1d539f5216584a2e9d4e8ea1d6af391e.webp,pro_hong_dam_3_68ed2ae4038c40aab2d83ac82b3b607b.webp,pro_hong_dam_4_1fafc0a96cf547a58e045e5887ea2f3a.webp}	545000	16	2023-06-01 18:48:21.374916+07	2023-06-24 14:47:43.897916+07	\N
410	55	15	2	biki687717mdred	pro_hong_dam_1_c332c0a019cd45e4a020ff66d78a5bde.webp	{pro_hong_dam_1_c332c0a019cd45e4a020ff66d78a5bde.webp,pro_hong_dam_2_1d539f5216584a2e9d4e8ea1d6af391e.webp,pro_hong_dam_3_68ed2ae4038c40aab2d83ac82b3b607b.webp,pro_hong_dam_4_1fafc0a96cf547a58e045e5887ea2f3a.webp}	545000	123	2023-06-01 18:48:26.794837+07	2023-06-24 14:47:43.897916+07	\N
411	55	15	3	biki687717ldred	pro_hong_dam_1_c332c0a019cd45e4a020ff66d78a5bde.webp	{pro_hong_dam_1_c332c0a019cd45e4a020ff66d78a5bde.webp,pro_hong_dam_2_1d539f5216584a2e9d4e8ea1d6af391e.webp,pro_hong_dam_3_68ed2ae4038c40aab2d83ac82b3b607b.webp,pro_hong_dam_4_1fafc0a96cf547a58e045e5887ea2f3a.webp}	545000	144	2023-06-01 18:48:31.624638+07	2023-06-24 14:47:43.897916+07	\N
412	55	2	1	biki687717sblk	pro_den_1_ea4ac5fe213146168340014db8287aa6.webp	{pro_den_1_ea4ac5fe213146168340014db8287aa6.webp,pro_den_2_f216b53a92a14383bc2b4f70e317773f.webp,pro_den_3_c5550730f61548279bc92cf7dded5dc4.webp,pro_den_4_a06443eb777241f2b291c7c354c2fcc3.webp}	545000	123	2023-06-01 18:48:51.614378+07	2023-06-24 14:47:43.897916+07	\N
413	55	2	2	biki687717mblk	pro_den_1_ea4ac5fe213146168340014db8287aa6.webp	{pro_den_1_ea4ac5fe213146168340014db8287aa6.webp,pro_den_2_f216b53a92a14383bc2b4f70e317773f.webp,pro_den_3_c5550730f61548279bc92cf7dded5dc4.webp,pro_den_4_a06443eb777241f2b291c7c354c2fcc3.webp}	545000	56	2023-06-01 18:49:02.09438+07	2023-06-24 14:47:43.897916+07	\N
414	55	2	3	biki687717lblk	pro_den_1_ea4ac5fe213146168340014db8287aa6.webp	{pro_den_1_ea4ac5fe213146168340014db8287aa6.webp,pro_den_2_f216b53a92a14383bc2b4f70e317773f.webp,pro_den_3_c5550730f61548279bc92cf7dded5dc4.webp,pro_den_4_a06443eb777241f2b291c7c354c2fcc3.webp}	545000	42	2023-06-01 18:49:07.134124+07	2023-06-24 14:47:43.897916+07	\N
415	56	6	1	biki723250swht	pro_trang_1_5eea636e8bcb44e0a0354e8ca198bf27.webp	{pro_trang_1_5eea636e8bcb44e0a0354e8ca198bf27.webp,pro_trang_2_ac84d945cf484edeb1c1e274f957a470.webp,pro_trang_3_871fbcd044e4443c8bea30df24dd11a9.webp,pro_trang_4_0f48065db8f641a684957d6bc62e5bf2.webp}	545000	42	2023-06-01 18:50:41.834506+07	2023-06-24 14:47:43.897916+07	\N
416	56	6	2	biki723250mwht	pro_trang_1_5eea636e8bcb44e0a0354e8ca198bf27.webp	{pro_trang_1_5eea636e8bcb44e0a0354e8ca198bf27.webp,pro_trang_2_ac84d945cf484edeb1c1e274f957a470.webp,pro_trang_3_871fbcd044e4443c8bea30df24dd11a9.webp,pro_trang_4_0f48065db8f641a684957d6bc62e5bf2.webp}	545000	123	2023-06-01 18:50:45.874379+07	2023-06-24 14:47:43.897916+07	\N
417	56	6	3	biki723250lwht	pro_trang_1_5eea636e8bcb44e0a0354e8ca198bf27.webp	{pro_trang_1_5eea636e8bcb44e0a0354e8ca198bf27.webp,pro_trang_2_ac84d945cf484edeb1c1e274f957a470.webp,pro_trang_3_871fbcd044e4443c8bea30df24dd11a9.webp,pro_trang_4_0f48065db8f641a684957d6bc62e5bf2.webp}	545000	543	2023-06-01 18:50:50.184427+07	2023-06-24 14:47:43.897916+07	\N
418	57	6	1	dres795435swht	pro_trang_1_ad3bcfbef2824f63bdef14c05724f797.webp	{pro_trang_1_ad3bcfbef2824f63bdef14c05724f797.webp,pro_trang_2_5030c6fd5c6343a8a3648b8905488895.webp,pro_trang_3_f309c26032dc4ac0a49b59987e5c642e.webp,pro_trang_4_10b39725b37145a7b7b1985bb0970252.webp}	995000	245	2023-06-01 18:56:36.665539+07	2023-06-24 14:47:43.897916+07	\N
419	57	6	2	dres795435mwht	pro_trang_1_ad3bcfbef2824f63bdef14c05724f797.webp	{pro_trang_1_ad3bcfbef2824f63bdef14c05724f797.webp,pro_trang_2_5030c6fd5c6343a8a3648b8905488895.webp,pro_trang_3_f309c26032dc4ac0a49b59987e5c642e.webp,pro_trang_4_10b39725b37145a7b7b1985bb0970252.webp}	995000	112	2023-06-01 18:56:41.352425+07	2023-06-24 14:47:43.897916+07	\N
420	57	6	3	dres795435lwht	pro_trang_1_ad3bcfbef2824f63bdef14c05724f797.webp	{pro_trang_1_ad3bcfbef2824f63bdef14c05724f797.webp,pro_trang_2_5030c6fd5c6343a8a3648b8905488895.webp,pro_trang_3_f309c26032dc4ac0a49b59987e5c642e.webp,pro_trang_4_10b39725b37145a7b7b1985bb0970252.webp}	995000	61	2023-06-01 18:56:56.835118+07	2023-06-24 14:47:43.897916+07	\N
421	57	10	1	dres795435slipik	pro_hong_1_7edb30911a63430397ab169d5e915044.webp	{pro_hong_1_7edb30911a63430397ab169d5e915044.webp,pro_hong_2_2f01bbd8e583418eb21d8e33380b8c28.webp,pro_hong_3_3485195639214c66a0d9deda8e657c66.webp,pro_hong_4_ab9fe5e774c04fa3b146796095340abb.webp}	995000	61	2023-06-01 18:57:27.134831+07	2023-06-24 14:47:43.897916+07	\N
422	57	10	2	dres795435mlipik	pro_hong_1_7edb30911a63430397ab169d5e915044.webp	{pro_hong_1_7edb30911a63430397ab169d5e915044.webp,pro_hong_2_2f01bbd8e583418eb21d8e33380b8c28.webp,pro_hong_3_3485195639214c66a0d9deda8e657c66.webp,pro_hong_4_ab9fe5e774c04fa3b146796095340abb.webp}	995000	61	2023-06-01 18:57:28.814489+07	2023-06-24 14:47:43.897916+07	\N
423	57	10	3	dres795435llipik	pro_hong_1_7edb30911a63430397ab169d5e915044.webp	{pro_hong_1_7edb30911a63430397ab169d5e915044.webp,pro_hong_2_2f01bbd8e583418eb21d8e33380b8c28.webp,pro_hong_3_3485195639214c66a0d9deda8e657c66.webp,pro_hong_4_ab9fe5e774c04fa3b146796095340abb.webp}	995000	12	2023-06-01 18:57:32.563369+07	2023-06-24 14:47:43.897916+07	\N
424	57	12	1	dres795435slblu	pro_xanh_duong_1_43f81f0866f44b56a713349d041eb490.webp	{pro_xanh_duong_1_43f81f0866f44b56a713349d041eb490.webp,pro_xanh_duong_2_2d48a16cf53443e2b0682687db9cf907.webp,pro_xanh_duong_3_d7830d222c9f4a86bd4756add38cf45e.webp,pro_xanh_duong_4_31e3a8d683ba43a0b70f034a9c4655ea.webp}	995000	12	2023-06-01 18:58:18.638392+07	2023-06-24 14:47:43.897916+07	\N
425	57	12	2	dres795435mlblu	pro_xanh_duong_1_43f81f0866f44b56a713349d041eb490.webp	{pro_xanh_duong_1_43f81f0866f44b56a713349d041eb490.webp,pro_xanh_duong_2_2d48a16cf53443e2b0682687db9cf907.webp,pro_xanh_duong_3_d7830d222c9f4a86bd4756add38cf45e.webp,pro_xanh_duong_4_31e3a8d683ba43a0b70f034a9c4655ea.webp}	995000	12	2023-06-01 18:58:23.078794+07	2023-06-24 14:47:43.897916+07	\N
426	57	12	3	dres795435llblu	pro_xanh_duong_1_43f81f0866f44b56a713349d041eb490.webp	{pro_xanh_duong_1_43f81f0866f44b56a713349d041eb490.webp,pro_xanh_duong_2_2d48a16cf53443e2b0682687db9cf907.webp,pro_xanh_duong_3_d7830d222c9f4a86bd4756add38cf45e.webp,pro_xanh_duong_4_31e3a8d683ba43a0b70f034a9c4655ea.webp}	995000	12	2023-06-01 18:58:25.159368+07	2023-06-24 14:47:43.897916+07	\N
265	34	8	1	polo142967slpik	pro_hoa_hong_4_b65eb70fb9e24247844eb0c7a664c424.webp	{pro_hoa_hong_4_b65eb70fb9e24247844eb0c7a664c424.webp,pro_hoa_hong_3_444ed078b3244b679403fb33a2a3bbc6.webp,pro_hoa_hong_2_ab648f4858464bc4a523ed982d902f99.webp,pro_hoa_hong_1_307225b7993846e58240c95a160e9eb2.webp}	255000	21	2023-06-01 16:48:56.143192+07	2023-06-24 14:47:43.897916+07	\N
349	48	6	1	polo664398swht	pro_trang_1_39a6bc9de59c490e9e6f723a8b0f20de.webp	{pro_trang_1_39a6bc9de59c490e9e6f723a8b0f20de.webp,pro_trang_2_36e4bdc1d8854cd7b81689770c05f1ea.webp,pro_trang_3_83ce35f5104f4b35ab32a4df657f9ebb.webp,pro_trang_4_ac2b2515b52f44319f009ad3c3c36c27.webp}	225000	14	2023-06-01 18:07:58.206676+07	2023-06-24 14:47:43.897916+07	\N
437	60	7	2	dres997856mlgre	pro_xanh_la_1_0ef5350c09634a4daa9bdff8c8e3b648.webp	{pro_xanh_la_1_0ef5350c09634a4daa9bdff8c8e3b648.webp,pro_xanh_la_2_36e3d222c51144e58fc0ba419dd5128a.webp,pro_xanh_la_3_f4ec9924794c4bb0b003afbc9010be2a.webp,pro_xanh_la_4_59b377c17920469f8405b440daa4a877.webp,pro_xanh_la_5_bb49a126d4c94003b8367803f83fc6dc.webp}	595000	75	2023-06-23 20:40:00.811641+07	2023-06-24 14:47:43.897916+07	\N
37	5	9	1	blaz611959sjgre	pro_xanh_la_1_6c02f5279de1432fae6d0554f069a26e.webp	{pro_xanh_la_1_6c02f5279de1432fae6d0554f069a26e.webp,pro_xanh_la_2_c2d4ed091a754768a632e8d91ca07649.webp,pro_xanh_la_3_aeaa9c87ab6848f59a05cb548611adf2.webp,pro_xanh_la_4_d8ae3c8f1f9c458d9d87bcf9443de8b6.webp}	595000	5	2023-06-01 10:43:36.830536+07	2023-06-24 14:47:43.897916+07	\N
7	1	5	1	blaz643515sbro	pro_nau_1_09e1b759486a4ae49e53c411332658d0.webp	{pro_nau_1_09e1b759486a4ae49e53c411332658d0.webp,pro_nau_2_21858c5f86eb4b55a36c84596c3b8db1.webp,pro_nau_3_401558bb37c540b588a774d8086ae57a.webp,pro_nau_4_c1715428d8cb48f0bf566f2ea1df924e.webp}	595000	11	2023-05-31 23:10:09.781293+07	2023-06-24 14:47:43.897916+07	\N
131	15	5	2	shor276930mbro	pro_nau_dam_1_1ca0254a11a1498d86a3ca87a0e855e4.webp	{pro_nau_dam_1_1ca0254a11a1498d86a3ca87a0e855e4.webp,pro_nau_dam_2_035ef215f861438ebb0a32cf86c853f0.webp,pro_nau_dam_3_44b2401f9c874f13b13445fdeec51c1f.webp,pro_nau_dam_4_2fe41cc41b3e47b8a398780e19fa9ebb.webp}	355000	10	2023-06-01 14:41:29.148082+07	2023-06-24 14:47:43.897916+07	\N
427	58	6	1	polo890934swht	pro_trang_1_48f4b8c48ed44874b03a874a3517dec8.webp	{pro_trang_1_48f4b8c48ed44874b03a874a3517dec8.webp,pro_trang_2_03f0b444be784c8a8c6e5b2b342347bc.webp,pro_trang_3_400de64a50c841f4a9aa9b206918bcc0.webp,pro_trang_4_965462a5f1d14db3b5ba85a12080102f.webp}	295000	87	2023-06-23 20:07:26.87542+07	2023-06-24 14:47:43.897916+07	\N
428	58	6	2	polo890934mwht	pro_trang_1_48f4b8c48ed44874b03a874a3517dec8.webp	{pro_trang_1_48f4b8c48ed44874b03a874a3517dec8.webp,pro_trang_2_03f0b444be784c8a8c6e5b2b342347bc.webp,pro_trang_3_400de64a50c841f4a9aa9b206918bcc0.webp,pro_trang_4_965462a5f1d14db3b5ba85a12080102f.webp}	295000	125	2023-06-23 20:07:50.26397+07	2023-06-24 14:47:43.897916+07	\N
429	58	6	3	polo890934lwht	pro_trang_1_48f4b8c48ed44874b03a874a3517dec8.webp	{pro_trang_1_48f4b8c48ed44874b03a874a3517dec8.webp,pro_trang_2_03f0b444be784c8a8c6e5b2b342347bc.webp,pro_trang_3_400de64a50c841f4a9aa9b206918bcc0.webp,pro_trang_4_965462a5f1d14db3b5ba85a12080102f.webp}	295000	99	2023-06-23 20:07:55.683539+07	2023-06-24 14:47:43.897916+07	\N
430	59	6	1	polo316667swht	pro_trang_1_e100f9fe84084b8c94fd724640c08613.webp	{pro_trang_1_e100f9fe84084b8c94fd724640c08613.webp,pro_trang_2_ab8c4ba7989a4c3998eb3c2e09a1c587.webp,pro_trang_3_4eff4e926f37420984f595fd4a3abf0a.webp,pro_trang_4_6f2684ce27a24c67b44d33acb5723555.webp}	355000	99	2023-06-23 20:10:39.590441+07	2023-06-24 14:47:43.897916+07	\N
431	59	6	2	polo316667mwht	pro_trang_1_e100f9fe84084b8c94fd724640c08613.webp	{pro_trang_1_e100f9fe84084b8c94fd724640c08613.webp,pro_trang_2_ab8c4ba7989a4c3998eb3c2e09a1c587.webp,pro_trang_3_4eff4e926f37420984f595fd4a3abf0a.webp,pro_trang_4_6f2684ce27a24c67b44d33acb5723555.webp}	355000	68	2023-06-23 20:10:43.740315+07	2023-06-24 14:47:43.897916+07	\N
432	59	6	3	polo316667lwht	pro_trang_1_e100f9fe84084b8c94fd724640c08613.webp	{pro_trang_1_e100f9fe84084b8c94fd724640c08613.webp,pro_trang_2_ab8c4ba7989a4c3998eb3c2e09a1c587.webp,pro_trang_3_4eff4e926f37420984f595fd4a3abf0a.webp,pro_trang_4_6f2684ce27a24c67b44d33acb5723555.webp}	355000	72	2023-06-23 20:10:48.800178+07	2023-06-24 14:47:43.897916+07	\N
433	60	10	1	dres997856slipik	pro_hong_1_ffb4ab3af8b3495fab5d83e0780deebe.webp	{pro_hong_1_ffb4ab3af8b3495fab5d83e0780deebe.webp,pro_hong_2_20efb37b0b3b418e9d7afe57fb874d4c.webp,pro_hong_3_64b58f0da0854a0db25d31dc4aa2bc42.webp,pro_hong_4_61ec24da4e044f77a3acebd02242414b.webp,pro_hong_5_9859d9f96296463da9862658f287ea6c.webp}	595000	72	2023-06-23 20:38:21.740523+07	2023-06-24 14:47:43.897916+07	\N
434	60	10	2	dres997856mlipik	pro_hong_1_ffb4ab3af8b3495fab5d83e0780deebe.webp	{pro_hong_1_ffb4ab3af8b3495fab5d83e0780deebe.webp,pro_hong_2_20efb37b0b3b418e9d7afe57fb874d4c.webp,pro_hong_3_64b58f0da0854a0db25d31dc4aa2bc42.webp,pro_hong_4_61ec24da4e044f77a3acebd02242414b.webp,pro_hong_5_9859d9f96296463da9862658f287ea6c.webp}	595000	124	2023-06-23 20:38:30.470303+07	2023-06-24 14:47:43.897916+07	\N
435	60	10	3	dres997856llipik	pro_hong_1_ffb4ab3af8b3495fab5d83e0780deebe.webp	{pro_hong_1_ffb4ab3af8b3495fab5d83e0780deebe.webp,pro_hong_2_20efb37b0b3b418e9d7afe57fb874d4c.webp,pro_hong_3_64b58f0da0854a0db25d31dc4aa2bc42.webp,pro_hong_4_61ec24da4e044f77a3acebd02242414b.webp,pro_hong_5_9859d9f96296463da9862658f287ea6c.webp}	595000	45	2023-06-23 20:39:30.571519+07	2023-06-24 14:47:43.897916+07	\N
436	60	7	1	dres997856slgre	pro_xanh_la_1_0ef5350c09634a4daa9bdff8c8e3b648.webp	{pro_xanh_la_1_0ef5350c09634a4daa9bdff8c8e3b648.webp,pro_xanh_la_2_36e3d222c51144e58fc0ba419dd5128a.webp,pro_xanh_la_3_f4ec9924794c4bb0b003afbc9010be2a.webp,pro_xanh_la_4_59b377c17920469f8405b440daa4a877.webp,pro_xanh_la_5_bb49a126d4c94003b8367803f83fc6dc.webp}	595000	45	2023-06-23 20:39:53.372043+07	2023-06-24 14:47:43.897916+07	\N
438	60	7	3	dres997856llgre	pro_xanh_la_1_0ef5350c09634a4daa9bdff8c8e3b648.webp	{pro_xanh_la_1_0ef5350c09634a4daa9bdff8c8e3b648.webp,pro_xanh_la_2_36e3d222c51144e58fc0ba419dd5128a.webp,pro_xanh_la_3_f4ec9924794c4bb0b003afbc9010be2a.webp,pro_xanh_la_4_59b377c17920469f8405b440daa4a877.webp,pro_xanh_la_5_bb49a126d4c94003b8367803f83fc6dc.webp}	595000	85	2023-06-23 20:40:07.021702+07	2023-06-24 14:47:43.897916+07	\N
439	61	10	1	polo983506slipik	pro_hong_1_7d68893b91f24b819ed76de5d5b17e93.webp	{pro_hong_1_7d68893b91f24b819ed76de5d5b17e93.webp,pro_hong_2_7692edbdaae2496e81172d727934186d.webp,pro_hong_3_3653daf322024e0da38827d3a340e8d6.webp,pro_hong_4_8cbe274e5798465c98d1849ad7b214c2.webp}	255000	85	2023-06-23 20:46:28.111632+07	2023-06-24 14:47:43.897916+07	\N
440	61	10	2	polo983506mlipik	pro_hong_1_7d68893b91f24b819ed76de5d5b17e93.webp	{pro_hong_1_7d68893b91f24b819ed76de5d5b17e93.webp,pro_hong_2_7692edbdaae2496e81172d727934186d.webp,pro_hong_3_3653daf322024e0da38827d3a340e8d6.webp,pro_hong_4_8cbe274e5798465c98d1849ad7b214c2.webp}	255000	85	2023-06-23 20:46:30.181747+07	2023-06-24 14:47:43.897916+07	\N
441	61	10	3	polo983506llipik	pro_hong_1_7d68893b91f24b819ed76de5d5b17e93.webp	{pro_hong_1_7d68893b91f24b819ed76de5d5b17e93.webp,pro_hong_2_7692edbdaae2496e81172d727934186d.webp,pro_hong_3_3653daf322024e0da38827d3a340e8d6.webp,pro_hong_4_8cbe274e5798465c98d1849ad7b214c2.webp}	255000	85	2023-06-23 20:46:32.181552+07	2023-06-24 14:47:43.897916+07	\N
442	61	6	1	polo983506swht	pro_trang_1_eb755ecdac05497b8f288dba9677ebe0.webp	{pro_trang_1_eb755ecdac05497b8f288dba9677ebe0.webp,pro_trang_2_74508ed38f34460882135c78eba5ec73.webp,pro_trang_3_6eef3bfdd2504a4d961739b5fca7d3a9.webp,pro_trang_4_964f184b01834fc09858897728ed8a09.webp}	255000	34	2023-06-23 20:46:50.971404+07	2023-06-24 14:47:43.897916+07	\N
443	61	6	2	polo983506mwht	pro_trang_1_eb755ecdac05497b8f288dba9677ebe0.webp	{pro_trang_1_eb755ecdac05497b8f288dba9677ebe0.webp,pro_trang_2_74508ed38f34460882135c78eba5ec73.webp,pro_trang_3_6eef3bfdd2504a4d961739b5fca7d3a9.webp,pro_trang_4_964f184b01834fc09858897728ed8a09.webp}	255000	34	2023-06-23 20:46:55.121161+07	2023-06-24 14:47:43.897916+07	\N
444	61	6	3	polo983506lwht	pro_trang_1_eb755ecdac05497b8f288dba9677ebe0.webp	{pro_trang_1_eb755ecdac05497b8f288dba9677ebe0.webp,pro_trang_2_74508ed38f34460882135c78eba5ec73.webp,pro_trang_3_6eef3bfdd2504a4d961739b5fca7d3a9.webp,pro_trang_4_964f184b01834fc09858897728ed8a09.webp}	255000	72	2023-06-23 20:47:00.62107+07	2023-06-24 14:47:43.897916+07	\N
445	62	2	1	polo540987sblk	pro_den_1_7966b2eafddc4309a8f099d60591364a.webp	{pro_den_1_7966b2eafddc4309a8f099d60591364a.webp,pro_den_2_34cdadd00a0a4790b13885c4a4bd4459.webp,pro_den_3_180b061fd430432296d35522c39ceb03.webp,pro_den_4_4d0a1fbd40214949a8a6c042869bf8ef.webp}	295000	72	2023-06-23 20:51:25.619528+07	2023-06-24 14:47:43.897916+07	\N
446	62	2	2	polo540987mblk	pro_den_1_7966b2eafddc4309a8f099d60591364a.webp	{pro_den_1_7966b2eafddc4309a8f099d60591364a.webp,pro_den_2_34cdadd00a0a4790b13885c4a4bd4459.webp,pro_den_3_180b061fd430432296d35522c39ceb03.webp,pro_den_4_4d0a1fbd40214949a8a6c042869bf8ef.webp}	295000	72	2023-06-23 20:51:27.417455+07	2023-06-24 14:47:43.897916+07	\N
447	62	2	3	polo540987lblk	pro_den_1_7966b2eafddc4309a8f099d60591364a.webp	{pro_den_1_7966b2eafddc4309a8f099d60591364a.webp,pro_den_2_34cdadd00a0a4790b13885c4a4bd4459.webp,pro_den_3_180b061fd430432296d35522c39ceb03.webp,pro_den_4_4d0a1fbd40214949a8a6c042869bf8ef.webp}	295000	88	2023-06-23 20:51:32.24888+07	2023-06-24 14:47:43.897916+07	\N
448	62	6	1	polo540987swht	pro_trang_1_c3f6bfdad0a24a71a03b98fbfc41cbec.webp	{pro_trang_1_c3f6bfdad0a24a71a03b98fbfc41cbec.webp,pro_trang_2_3949ec4ebdef4594aaaece84e9962c6c.webp,pro_trang_4_ae5cb7b7660941d3a5722daf20b303c4.webp,pro_trang_5_102445fb9b004971b4d5e06b2abf36b7.webp}	295000	88	2023-06-23 20:51:48.198924+07	2023-06-24 14:47:43.897916+07	\N
449	62	6	2	polo540987mwht	pro_trang_1_c3f6bfdad0a24a71a03b98fbfc41cbec.webp	{pro_trang_1_c3f6bfdad0a24a71a03b98fbfc41cbec.webp,pro_trang_2_3949ec4ebdef4594aaaece84e9962c6c.webp,pro_trang_4_ae5cb7b7660941d3a5722daf20b303c4.webp,pro_trang_5_102445fb9b004971b4d5e06b2abf36b7.webp}	295000	88	2023-06-23 20:51:53.118342+07	2023-06-24 14:47:43.897916+07	\N
450	62	6	3	polo540987lwht	pro_trang_1_c3f6bfdad0a24a71a03b98fbfc41cbec.webp	{pro_trang_1_c3f6bfdad0a24a71a03b98fbfc41cbec.webp,pro_trang_2_3949ec4ebdef4594aaaece84e9962c6c.webp,pro_trang_4_ae5cb7b7660941d3a5722daf20b303c4.webp,pro_trang_5_102445fb9b004971b4d5e06b2abf36b7.webp}	295000	77	2023-06-23 20:51:57.948603+07	2023-06-24 14:47:43.897916+07	\N
451	63	17	1	dres813707spik	pro_hong_2_15d00bd1ea704f5c8df0668bd5f8649c.webp	{pro_hong_2_15d00bd1ea704f5c8df0668bd5f8649c.webp,pro_hong_4_2473ec2aa53d4cd1849aaf8a7427b010.webp,pro_hong_5_d7520eeaf99c4856ac3017d20bc85bd5.webp,pro_hong_6_55c3679b53944b898785491f7cf757c9.webp}	595000	77	2023-06-23 20:57:04.20815+07	2023-06-24 14:47:43.897916+07	\N
452	63	17	2	dres813707mpik	pro_hong_2_15d00bd1ea704f5c8df0668bd5f8649c.webp	{pro_hong_2_15d00bd1ea704f5c8df0668bd5f8649c.webp,pro_hong_4_2473ec2aa53d4cd1849aaf8a7427b010.webp,pro_hong_5_d7520eeaf99c4856ac3017d20bc85bd5.webp,pro_hong_6_55c3679b53944b898785491f7cf757c9.webp}	595000	120	2023-06-23 20:57:11.717749+07	2023-06-24 14:47:43.897916+07	\N
453	63	17	3	dres813707lpik	pro_hong_2_15d00bd1ea704f5c8df0668bd5f8649c.webp	{pro_hong_2_15d00bd1ea704f5c8df0668bd5f8649c.webp,pro_hong_4_2473ec2aa53d4cd1849aaf8a7427b010.webp,pro_hong_5_d7520eeaf99c4856ac3017d20bc85bd5.webp,pro_hong_6_55c3679b53944b898785491f7cf757c9.webp}	595000	120	2023-06-23 20:57:13.637955+07	2023-06-24 14:47:43.897916+07	\N
454	64	5	1	dres920160sbro	pro_cam_1_4ffff3a33bfb40918c3b6fa6c573229d.webp	{pro_cam_1_4ffff3a33bfb40918c3b6fa6c573229d.webp,pro_cam_3_08bbc5b06ae54f6699afe092b237a48a.webp,pro_cam_4_420cf6c23c274dd5ad7f0bb9e7abb9c8.webp,pro_cam_5_42b3d027c60a47a4946686ebdc49e33f.webp}	695000	120	2023-06-23 20:59:42.997096+07	2023-06-24 14:47:43.897916+07	\N
455	64	5	2	dres920160mbro	pro_cam_1_4ffff3a33bfb40918c3b6fa6c573229d.webp	{pro_cam_1_4ffff3a33bfb40918c3b6fa6c573229d.webp,pro_cam_3_08bbc5b06ae54f6699afe092b237a48a.webp,pro_cam_4_420cf6c23c274dd5ad7f0bb9e7abb9c8.webp,pro_cam_5_42b3d027c60a47a4946686ebdc49e33f.webp}	695000	120	2023-06-23 20:59:44.766549+07	2023-06-24 14:47:43.897916+07	\N
456	64	5	3	dres920160lbro	pro_cam_1_4ffff3a33bfb40918c3b6fa6c573229d.webp	{pro_cam_1_4ffff3a33bfb40918c3b6fa6c573229d.webp,pro_cam_3_08bbc5b06ae54f6699afe092b237a48a.webp,pro_cam_4_420cf6c23c274dd5ad7f0bb9e7abb9c8.webp,pro_cam_5_42b3d027c60a47a4946686ebdc49e33f.webp}	695000	21	2023-06-23 20:59:48.596567+07	2023-06-24 14:47:43.897916+07	\N
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 9, true);


--
-- Name: colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.colors_id_seq', 20, true);


--
-- Name: payment_method_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_method_id_seq', 1, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 72, true);


--
-- Name: sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sizes_id_seq', 3, true);


--
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.states_id_seq', 5, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 42, true);


--
-- Name: variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.variants_id_seq', 471, true);


--
-- Name: cart_variant cart_variant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_variant
    ADD CONSTRAINT cart_variant_pkey PRIMARY KEY (cart_id, variant_id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- Name: colors colors_value_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_value_key UNIQUE (value);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payment_methods payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_method_pkey PRIMARY KEY (id);


--
-- Name: products products_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_code_key UNIQUE (code);


--
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: sizes sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (id);


--
-- Name: sizes sizes_value_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_value_key UNIQUE (value);


--
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- Name: states states_value_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_value_key UNIQUE (value);


--
-- Name: users user_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_id_unique UNIQUE (user_id);


--
-- Name: variants variants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT variants_pkey PRIMARY KEY (id);


--
-- Name: variants variants_sku_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT variants_sku_key UNIQUE (sku);


--
-- Name: idx_orders_updated; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_orders_updated ON public.orders USING btree (updated_at);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: idx_variants_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_variants_product_id ON public.variants USING btree (product_id);


--
-- Name: idx_variants_size_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_variants_size_id ON public.variants USING btree (size_id);


--
-- Name: cart_variant cart_variant_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_variant
    ADD CONSTRAINT cart_variant_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.users(user_id);


--
-- Name: cart_variant cart_variant_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_variant
    ADD CONSTRAINT cart_variant_variant_id_fkey FOREIGN KEY (variant_id) REFERENCES public.variants(id);


--
-- Name: products fk_categories; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_categories FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: variants fk_colors; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT fk_colors FOREIGN KEY (color_id) REFERENCES public.colors(id);


--
-- Name: orders fk_order_payment_method; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_payment_method FOREIGN KEY (payment_method_id) REFERENCES public.payment_methods(id);


--
-- Name: orders fk_orders_states; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_states FOREIGN KEY (state_id) REFERENCES public.states(id);


--
-- Name: variants fk_products; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: variants fk_sizes; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT fk_sizes FOREIGN KEY (size_id) REFERENCES public.sizes(id);


--
-- Name: orders fk_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

