--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.1)

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
-- Name: calcular_adeudo(); Type: FUNCTION; Schema: public; Owner: misael
--

CREATE FUNCTION public.calcular_adeudo() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Asigna el precio del paquete a monto_original
    SELECT precio INTO NEW.monto_original FROM paquete WHERE id_paquete = NEW.id_paquete;
    -- Calcula el monto adeudado
    NEW.monto_adeudado := NEW.monto_original - NEW.monto_pagado;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calcular_adeudo() OWNER TO misael;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agenda; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.agenda (
    id_cita integer NOT NULL,
    id_empleado integer,
    id_cabina integer,
    id_cliente integer,
    id_sesion integer,
    fecha timestamp without time zone,
    fecha_cancelacion timestamp without time zone,
    hora_inicio time without time zone,
    hora_fin time without time zone,
    estado character varying(20),
    id_paquete integer,
    numero_visita integer DEFAULT 0,
    id_spa integer,
    tipo_cita character varying(35),
    id_cita_origen integer
);


ALTER TABLE public.agenda OWNER TO misael;

--
-- Name: agenda_id_cita_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.agenda_id_cita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agenda_id_cita_seq OWNER TO misael;

--
-- Name: agenda_id_cita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.agenda_id_cita_seq OWNED BY public.agenda.id_cita;


--
-- Name: cabina; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.cabina (
    id_cabina integer NOT NULL,
    numero_cabina integer,
    estado_cabina text,
    id_empleado integer NOT NULL,
    turno text,
    id_spa integer
);


ALTER TABLE public.cabina OWNER TO misael;

--
-- Name: cabina_id_cabina_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.cabina_id_cabina_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabina_id_cabina_seq OWNER TO misael;

--
-- Name: cabina_id_cabina_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.cabina_id_cabina_seq OWNED BY public.cabina.id_cabina;


--
-- Name: cliente; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_cliente character varying(80) NOT NULL,
    apellido_paterno character varying(30) NOT NULL,
    apellido_materno character varying(30) NOT NULL,
    tipo_cliente character varying(15) NOT NULL,
    email character varying(50),
    telefono_cliente character varying(15),
    fecha_nacimiento date,
    sexo character(1) NOT NULL,
    id_spa integer NOT NULL,
    es_cliente boolean DEFAULT true NOT NULL,
    como_se_entero character varying(50),
    tipo_valoracion character varying(30)
);


ALTER TABLE public.cliente OWNER TO misael;

--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_cliente_seq OWNER TO misael;

--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;


--
-- Name: compra; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.compra (
    id_cliente integer NOT NULL,
    id_paquete integer NOT NULL,
    fecha_compra date NOT NULL,
    estado_compra character varying(20),
    monto_original numeric(12,2),
    monto_pagado numeric(12,2) DEFAULT 0,
    monto_adeudado numeric(12,2) DEFAULT 0,
    id_compra integer NOT NULL
);


ALTER TABLE public.compra OWNER TO misael;

--
-- Name: compra_id_compra_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.compra_id_compra_seq OWNER TO misael;

--
-- Name: compra_id_compra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;


--
-- Name: empleado; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.empleado (
    id_empleado integer NOT NULL,
    nombre_empleado character varying(50) NOT NULL,
    apellido_paterno character varying(30) NOT NULL,
    apellido_materno character varying(30) NOT NULL,
    tipo_empleado character varying(15) NOT NULL,
    email character varying(50) NOT NULL,
    telefono_empleado character varying(15) NOT NULL,
    fecha_nacimiento date NOT NULL,
    sexo character varying(1) NOT NULL,
    password_empleado character varying(255) NOT NULL,
    fecha_contratacion date,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.empleado OWNER TO misael;

--
-- Name: empleado_id_empleado_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.empleado_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empleado_id_empleado_seq OWNER TO misael;

--
-- Name: empleado_id_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.empleado_id_empleado_seq OWNED BY public.empleado.id_empleado;


--
-- Name: feedback_valoracion; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.feedback_valoracion (
    id_feedback integer NOT NULL,
    id_valoracion integer,
    calificacion integer,
    comentario text,
    CONSTRAINT feedback_valoracion_calificacion_check CHECK (((calificacion >= 1) AND (calificacion <= 5)))
);


ALTER TABLE public.feedback_valoracion OWNER TO misael;

--
-- Name: feedback_valoracion_id_feedback_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.feedback_valoracion_id_feedback_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_valoracion_id_feedback_seq OWNER TO misael;

--
-- Name: feedback_valoracion_id_feedback_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.feedback_valoracion_id_feedback_seq OWNED BY public.feedback_valoracion.id_feedback;


--
-- Name: insumos; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.insumos (
    id_insumo integer NOT NULL,
    nombre_insumo character varying(100) NOT NULL,
    precio numeric(12,2) NOT NULL,
    cantidad integer NOT NULL,
    fecha_vencimiento date,
    categoria character varying(40),
    unidad_medida character varying(20) NOT NULL,
    id_cabina integer NOT NULL
);


ALTER TABLE public.insumos OWNER TO misael;

--
-- Name: insumos_id_insumo_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.insumos_id_insumo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insumos_id_insumo_seq OWNER TO misael;

--
-- Name: insumos_id_insumo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.insumos_id_insumo_seq OWNED BY public.insumos.id_insumo;


--
-- Name: paquete; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.paquete (
    id_paquete integer NOT NULL,
    nombre_paquete character varying(50),
    descripcion character varying(800),
    precio numeric(12,2),
    fecha_inicio date,
    fecha_fin date,
    estado_paquete text,
    imagen_paquete character varying(152),
    numero_visitas integer DEFAULT 0,
    numero_zonas_cuerpo integer DEFAULT 0,
    id_valoracion integer
);


ALTER TABLE public.paquete OWNER TO misael;

--
-- Name: paquete_id_paquete_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.paquete_id_paquete_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.paquete_id_paquete_seq OWNER TO misael;

--
-- Name: paquete_id_paquete_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.paquete_id_paquete_seq OWNED BY public.paquete.id_paquete;


--
-- Name: pertenece_a; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.pertenece_a (
    id_spa integer NOT NULL,
    id_paquete integer NOT NULL
);


ALTER TABLE public.pertenece_a OWNER TO misael;

--
-- Name: producto; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(40) NOT NULL,
    precio numeric(12,2) NOT NULL,
    descripcion text,
    cantidad integer NOT NULL,
    imagen_producto character varying(100),
    id_spa integer
);


ALTER TABLE public.producto OWNER TO misael;

--
-- Name: producto_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_id_producto_seq OWNER TO misael;

--
-- Name: producto_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;


--
-- Name: sesion; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.sesion (
    id_sesion integer NOT NULL,
    id_empleado integer,
    numero_sesion integer NOT NULL,
    descripcion text,
    duracion time without time zone,
    id_paquete integer
);


ALTER TABLE public.sesion OWNER TO misael;

--
-- Name: sesion_id_sesion_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.sesion_id_sesion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sesion_id_sesion_seq OWNER TO misael;

--
-- Name: sesion_id_sesion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.sesion_id_sesion_seq OWNED BY public.sesion.id_sesion;


--
-- Name: spa; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.spa (
    id_spa integer NOT NULL,
    nombre_spa character varying(50) NOT NULL,
    ciudad character varying(30) NOT NULL,
    calle character varying(30) NOT NULL,
    colonia character varying(50) NOT NULL,
    codigo_postal integer NOT NULL,
    telefono character varying(15) NOT NULL
);


ALTER TABLE public.spa OWNER TO misael;

--
-- Name: spa_id_spa_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.spa_id_spa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spa_id_spa_seq OWNER TO misael;

--
-- Name: spa_id_spa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.spa_id_spa_seq OWNED BY public.spa.id_spa;


--
-- Name: trabaja_en; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.trabaja_en (
    id_empleado integer NOT NULL,
    id_spa integer NOT NULL,
    puesto character varying(40),
    salario numeric(12,2)
);


ALTER TABLE public.trabaja_en OWNER TO misael;

--
-- Name: valoracion; Type: TABLE; Schema: public; Owner: misael
--

CREATE TABLE public.valoracion (
    id_valoracion integer NOT NULL,
    id_cliente integer,
    id_empleado integer,
    id_cabina integer,
    fecha_valoracion timestamp without time zone NOT NULL,
    fecha_cancelacion timestamp without time zone,
    estado character varying(20),
    observaciones text,
    recomendaciones text,
    resultado character varying(35),
    paquete_recomendado integer,
    id_spa integer
);


ALTER TABLE public.valoracion OWNER TO misael;

--
-- Name: valoracion_id_valoracion_seq; Type: SEQUENCE; Schema: public; Owner: misael
--

CREATE SEQUENCE public.valoracion_id_valoracion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.valoracion_id_valoracion_seq OWNER TO misael;

--
-- Name: valoracion_id_valoracion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: misael
--

ALTER SEQUENCE public.valoracion_id_valoracion_seq OWNED BY public.valoracion.id_valoracion;


--
-- Name: agenda id_cita; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda ALTER COLUMN id_cita SET DEFAULT nextval('public.agenda_id_cita_seq'::regclass);


--
-- Name: cabina id_cabina; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.cabina ALTER COLUMN id_cabina SET DEFAULT nextval('public.cabina_id_cabina_seq'::regclass);


--
-- Name: cliente id_cliente; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);


--
-- Name: compra id_compra; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);


--
-- Name: empleado id_empleado; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.empleado ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleado_id_empleado_seq'::regclass);


--
-- Name: feedback_valoracion id_feedback; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.feedback_valoracion ALTER COLUMN id_feedback SET DEFAULT nextval('public.feedback_valoracion_id_feedback_seq'::regclass);


--
-- Name: insumos id_insumo; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.insumos ALTER COLUMN id_insumo SET DEFAULT nextval('public.insumos_id_insumo_seq'::regclass);


--
-- Name: paquete id_paquete; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.paquete ALTER COLUMN id_paquete SET DEFAULT nextval('public.paquete_id_paquete_seq'::regclass);


--
-- Name: producto id_producto; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);


--
-- Name: sesion id_sesion; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.sesion ALTER COLUMN id_sesion SET DEFAULT nextval('public.sesion_id_sesion_seq'::regclass);


--
-- Name: spa id_spa; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.spa ALTER COLUMN id_spa SET DEFAULT nextval('public.spa_id_spa_seq'::regclass);


--
-- Name: valoracion id_valoracion; Type: DEFAULT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.valoracion ALTER COLUMN id_valoracion SET DEFAULT nextval('public.valoracion_id_valoracion_seq'::regclass);


--
-- Name: agenda agenda_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT agenda_pkey PRIMARY KEY (id_cita);


--
-- Name: cabina cabina_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.cabina
    ADD CONSTRAINT cabina_pkey PRIMARY KEY (id_cabina);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);


--
-- Name: compra compra_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);


--
-- Name: empleado empleado_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pkey PRIMARY KEY (id_empleado);


--
-- Name: feedback_valoracion feedback_valoracion_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.feedback_valoracion
    ADD CONSTRAINT feedback_valoracion_pkey PRIMARY KEY (id_feedback);


--
-- Name: insumos insumos_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.insumos
    ADD CONSTRAINT insumos_pkey PRIMARY KEY (id_insumo);


--
-- Name: paquete paquete_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.paquete
    ADD CONSTRAINT paquete_pkey PRIMARY KEY (id_paquete);


--
-- Name: pertenece_a pertenece_a_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.pertenece_a
    ADD CONSTRAINT pertenece_a_pkey PRIMARY KEY (id_spa, id_paquete);


--
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);


--
-- Name: sesion sesion_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.sesion
    ADD CONSTRAINT sesion_pkey PRIMARY KEY (id_sesion);


--
-- Name: spa spa_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.spa
    ADD CONSTRAINT spa_pkey PRIMARY KEY (id_spa);


--
-- Name: trabaja_en trabaja_en_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.trabaja_en
    ADD CONSTRAINT trabaja_en_pkey PRIMARY KEY (id_empleado, id_spa);


--
-- Name: valoracion valoracion_pkey; Type: CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.valoracion
    ADD CONSTRAINT valoracion_pkey PRIMARY KEY (id_valoracion);


--
-- Name: compra trigger_calcular_adeudo; Type: TRIGGER; Schema: public; Owner: misael
--

CREATE TRIGGER trigger_calcular_adeudo BEFORE INSERT OR UPDATE ON public.compra FOR EACH ROW EXECUTE FUNCTION public.calcular_adeudo();


--
-- Name: agenda agenda_id_cabina_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT agenda_id_cabina_fkey FOREIGN KEY (id_cabina) REFERENCES public.cabina(id_cabina) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: agenda agenda_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT agenda_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: agenda agenda_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT agenda_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: agenda agenda_id_paquete_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT agenda_id_paquete_fkey FOREIGN KEY (id_paquete) REFERENCES public.paquete(id_paquete) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: agenda agenda_id_sesion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT agenda_id_sesion_fkey FOREIGN KEY (id_sesion) REFERENCES public.sesion(id_sesion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cabina cabina_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.cabina
    ADD CONSTRAINT cabina_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cabina cabina_id_spa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.cabina
    ADD CONSTRAINT cabina_id_spa_fkey FOREIGN KEY (id_spa) REFERENCES public.spa(id_spa) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: compra compra_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: compra compra_id_paquete_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_id_paquete_fkey FOREIGN KEY (id_paquete) REFERENCES public.paquete(id_paquete) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: agenda fk_agenda_spa; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT fk_agenda_spa FOREIGN KEY (id_spa) REFERENCES public.spa(id_spa) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: agenda fk_id_cita_origen; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.agenda
    ADD CONSTRAINT fk_id_cita_origen FOREIGN KEY (id_cita_origen) REFERENCES public.agenda(id_cita) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: valoracion fk_valoracion_spa; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.valoracion
    ADD CONSTRAINT fk_valoracion_spa FOREIGN KEY (id_spa) REFERENCES public.spa(id_spa) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: insumos insumos_id_cabina_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.insumos
    ADD CONSTRAINT insumos_id_cabina_fkey FOREIGN KEY (id_cabina) REFERENCES public.cabina(id_cabina) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: pertenece_a pertenece_a_id_paquete_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.pertenece_a
    ADD CONSTRAINT pertenece_a_id_paquete_fkey FOREIGN KEY (id_paquete) REFERENCES public.paquete(id_paquete) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pertenece_a pertenece_a_id_spa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.pertenece_a
    ADD CONSTRAINT pertenece_a_id_spa_fkey FOREIGN KEY (id_spa) REFERENCES public.spa(id_spa) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sesion sesion_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.sesion
    ADD CONSTRAINT sesion_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trabaja_en trabaja_en_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.trabaja_en
    ADD CONSTRAINT trabaja_en_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: valoracion valoracion_id_cabina_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.valoracion
    ADD CONSTRAINT valoracion_id_cabina_fkey FOREIGN KEY (id_cabina) REFERENCES public.cabina(id_cabina) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: valoracion valoracion_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.valoracion
    ADD CONSTRAINT valoracion_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: valoracion valoracion_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.valoracion
    ADD CONSTRAINT valoracion_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: valoracion valoracion_paquete_recomendado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: misael
--

ALTER TABLE ONLY public.valoracion
    ADD CONSTRAINT valoracion_paquete_recomendado_fkey FOREIGN KEY (paquete_recomendado) REFERENCES public.paquete(id_paquete);


--
-- PostgreSQL database dump complete
--

