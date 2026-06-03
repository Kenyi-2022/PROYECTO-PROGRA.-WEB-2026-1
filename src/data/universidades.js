const universidades = [
  {
    id: 1,
    nombre: "Universidad de Lima",
    tipo: "Privada",
    logo: "/universidades/ulima.png",
    webOficial: "https://www.ulima.edu.pe",
    descripcion: "Universidad privada de prestigio en Lima, reconocida por su excelencia académica y moderna infraestructura.",
    ubicacion: "Av. Javier Prado Este 4600, Santiago de Surco, Lima",
    telefono: "(01) 437-6767",
    costoMatricula: "S/. 1,200 - S/. 2,500",
    escalas: [
      { escala: "Escala A", rango: "S/. 3,800 - S/. 4,200 mensual" },
      { escala: "Escala B", rango: "S/. 3,200 - S/. 3,800 mensual" },
      { escala: "Escala C", rango: "S/. 2,800 - S/. 3,200 mensual" },
      { escala: "Escala D", rango: "S/. 2,500 - S/. 2,800 mensual" },
      { escala: "Escala E", rango: "S/. 2,000 - S/. 2,500 mensual" },
    ],
    carreras: [
      {
        nombre: "Ingeniería de Sistemas",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        planEstudios: "/mallas/ulima-sistemas.pdf",
        descripcion: "Forma ingenieros capaces de diseñar, implementar y gestionar sistemas de información."
      },
      {
        nombre: "Ingeniería Industrial",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        planEstudios: "/mallas/ulima-industrial.pdf",
        descripcion: "Optimización de procesos productivos y gestión eficiente de recursos."
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 230,
        planEstudios: "/mallas/ulima-arquitectura.pdf",
        descripcion: "Diseño y planificación de espacios habitables con enfoque sostenible."
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        planEstudios: "/mallas/ulima-administracion.pdf",
        descripcion: "Gestión estratégica de organizaciones públicas y privadas."
      },
      {
        nombre: "Marketing",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "null",
        descripcion: "Estrategias de mercado, branding y comportamiento del consumidor."
      },
      {
        nombre: "Economía",
        facultad: "Economía",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        planEstudios: "/mallas/ulima-economia.pdf",
        descripcion: "Análisis económico, políticas públicas y mercados financieros."
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        planEstudios: "/mallas/ulima-derecho.pdf",
        descripcion: "Formación jurídica integral con enfoque en derecho corporativo."
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/ulima-psicologia.pdf",
        descripcion: "Comprensión del comportamiento humano y salud mental."
      },
      {
        nombre: "Contabilidad",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "/mallas/ulima-contabilidad.pdf",
        descripcion: "Gestión financiera, auditoría y contabilidad empresarial."
      },
      {
        nombre: "Comunicación",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/ulima-comunicacion.pdf",
        descripcion: "Comunicación estratégica, periodismo y medios digitales."
      }
    ]
  },

  {
    id: 2,
    nombre: "Pontificia Universidad Católica del Perú",
    tipo: "Privada",
    logo: "/universidades/pucp.png",
    webOficial: "https://www.pucp.edu.pe",
    descripcion: "Una de las universidades más prestigiosas del Perú, reconocida por su investigación y compromiso social.",
    ubicacion: "Av. Universitaria 1801, San Miguel, Lima",
    telefono: "(01) 626-2000",
    costoMatricula: "S/. 800 - S/. 1,500",
    escalas: [
      { escala: "Escala A", rango: "S/. 3,200 - S/. 3,800 mensual" },
      { escala: "Escala B", rango: "S/. 2,600 - S/. 3,200 mensual" },
      { escala: "Escala C", rango: "S/. 2,000 - S/. 2,600 mensual" },
      { escala: "Escala D", rango: "S/. 1,400 - S/. 2,000 mensual" },
      { escala: "Escala E", rango: "S/. 800 - S/. 1,400 mensual" },
      { escala: "Escala F", rango: "S/. 400 - S/. 800 mensual" },
      { escala: "Escala G", rango: "Menos de S/. 400 mensual" },
    ],
    carreras: [
      {
        nombre: "Ingeniería Informática",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 218,
        planEstudios: "/mallas/pucp-informatica.pdf",
        descripcion: "Desarrollo de software, inteligencia artificial y sistemas computacionales."
      },
      {
        nombre: "Ingeniería Civil",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        planEstudios: "/mallas/pucp-civil.pdf",
        descripcion: "Diseño y construcción de infraestructura civil sostenible."
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 230,
        planEstudios:"/mallas/pucp-arquitectura.pdf",
        descripcion: "Arquitectura con enfoque en diseño urbano y sostenibilidad."
      },
      {
        nombre: "Economía",
        facultad: "Ciencias Sociales",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/pucp-economia.pdf",
        descripcion: "Economía aplicada, política económica y desarrollo social."
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "/mallas/pucp-psciologia.pdf",
        descripcion: "Psicología clínica, educativa y organizacional."
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        planEstudios: "/mallas/pucp-derecho.pdf",
        descripcion: "Derecho constitucional, civil y corporativo."
      },
      {
        nombre: "Ingenieria Mecatronica",
        facultad: "Ciencias e Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 222,
        planEstudios: "/mallas/pucp-mecatronica.pdf",
         descripcion: "Integración de sistemas mecánicos, electrónicos y de control."
      },
      {
        nombre: "Diseño Gráfico",
        facultad: "Arte y Diseño",
        duracion: "10 ciclos (5 años)",
        creditos: 198,
        planEstudios: "/mallas/pucp-diseño.pdf",
        descripcion: "Diseño visual, identidad de marca y comunicación gráfica."
      },
      {
        nombre: "Comunicación Audiovisual",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/pucp-comunicacion.pdf",
        descripcion: "Producción audiovisual, cine y medios digitales."
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        planEstudios: "/mallas/pucp-administracion.pdf",
        descripcion: "Gestión empresarial con enfoque en responsabilidad social."
      }
    ]
  },

   {
    id: 3,
    nombre: "Universidad Nacional Mayor de San Marcos",
    tipo: "Pública",
    logo: "/universidades/unmsm.png",
    webOficial: "https://www.unmsm.edu.pe",
    descripcion: "La universidad más antigua de América, referente de la educación pública de calidad en el Perú.",
    ubicacion: "Ciudad Universitaria, Cercado de Lima",
    telefono: "(01) 619-7000",
    costoMatricula: "Gratuita",
    escalas: [
      { escala: "Costo administrativo", rango: "S/. 50 - S/. 150 por ciclo" },
      { escala: "Pensión mensual", rango: "Gratuita (educación pública)" },
    ],
    carreras: [
      {
        nombre: "Medicina",
        facultad: "Medicina",
        duracion: "14 ciclos (7 años)",
        creditos: 340,
        planEstudios: "/mallas/unmsm-medicina.pdf",
        descripcion: "Una de las escuelas de medicina más reconocidas del país."
      },
      {
        nombre: "Ingeniería de Software",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        planEstudios: "/mallas/unmsm-software.pdf",
        descripcion: "Desarrollo de software de calidad y gestión de proyectos tecnológicos."
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        planEstudios: "/mallas/unmsm-derecho.pdf",
        descripcion: "Formación jurídica con enfoque en derecho público y privado."
      },
      {
        nombre: "Farmacia",
        facultad: "Farmacia y Bioquímica",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        planEstudios: "/mallas/unmsm-farmacia.pdf",
        descripcion: "Ciencias farmacéuticas y bioquímica aplicada."
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/unmsm-psicologia.pdf",
        descripcion: "Psicología clínica y comunitaria con enfoque social."
      },
      {
        nombre: "Administración",
        facultad: "Administración",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "/mallas/unmsm-administracion.pdf",
        descripcion: "Gestión pública y privada con visión estratégica."
      },
      {
        nombre: "Contabilidad",
        facultad: "Ciencias Contables",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "/mallas/unmsm-contabilidad.pdf",
        descripcion: "Contabilidad, auditoría y finanzas corporativas."
      },
      {
        nombre: "Odontología",
        facultad: "Odontología",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        planEstudios: "/mallas/unmsm-odontologia.pdf",
        descripcion: "Salud oral y odontología clínica integral."
      },
      {
        nombre: "Ingeniería Industrial",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        planEstudios: "https://industrial.unmsm.edu.pe/escuelas-profesionales/epii/plan-de-estudios-eap-ingenieria-industrial-2023/",
        descripcion: "Optimización industrial y gestión de operaciones."
      },
      {
        nombre: "Biología",
        facultad: "Ciencias Biológicas",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/unmsm-biologia.pdf",
        descripcion: "Biología molecular, ecología y ciencias de la vida."
      }
    ]
  },

  {
    id: 4,
    nombre: "Universidad Nacional de Ingeniería",
    tipo: "Pública",
    logo: "/universidades/uni.png",
    webOficial: "https://www.uni.edu.pe",
    descripcion: "La universidad de ingeniería más prestigiosa del Perú, líder en formación técnica y científica.",
    ubicacion: "Av. Túpac Amaru 210, Rímac, Lima",
    telefono: "(01) 481-1070",
    costoMatricula: "Gratuita",
    escalas: [
      { escala: "Costo administrativo", rango: "S/. 50 - S/. 120 por ciclo" },
      { escala: "Pensión mensual", rango: "Gratuita (educación pública)" },
    ],
    carreras: [
      {
        nombre: "Ingeniería de Sistemas",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        planEstudios: "/mallas/uni-sistemas.pdf",
        descripcion: "Sistemas computacionales, redes y desarrollo de software."
      },
      {
        nombre: "Ingeniería Civil",
        facultad: "Ingeniería Civil",
        duracion: "10 ciclos (5 años)",
        creditos: 230,
        planEstudios: "/mallas/uni-civil.pdf",
        descripcion: "Infraestructura civil, estructuras y gestión de proyectos."
      },
      {
        nombre: "Ingeniería Industrial",
        facultad: "Ingeniería Industrial",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        planEstudios: "/mallas/uni-industrial.pdf",
        descripcion: "Procesos productivos y optimización de sistemas industriales."
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        planEstudios: "/mallas/uni-industrial.pdf",
        descripcion: "Arquitectura, urbanismo y diseño ambiental."
      },
      {
        nombre: "Ingeniería Mecánica",
        facultad: "Ingeniería Mecánica",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        planEstudios: "/mallas/uni-mecanica.pdf",
        descripcion: "Diseño mecánico, termodinámica y manufactura."
      },
      {
        nombre: "Ingeniería Electrónica",
        facultad: "Ingeniería Electrónica",
        duracion: "10 ciclos (5 años)",
        creditos: 218,
        planEstudios: "/mallas/uni-electronica.pdf",
        descripcion: "Electrónica, telecomunicaciones y sistemas embebidos."
      },
      {
        nombre: "Ingeniería Química",
        facultad: "Ingeniería Química",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        planEstudios: "/mallas/uni-quimica.pdf",
        descripcion: "Procesos químicos industriales y química aplicada."
      },
      {
        nombre: "Ingeniería Ambiental",
        facultad: "Ingeniería Ambiental",
        duracion: "10 ciclos (5 años)",
        creditos: 210,
        planEstudios: "/mallas/uni-ambiental.pdf",
        descripcion: "Gestión ambiental y desarrollo sostenible."
      },
      {
        nombre: "Ingeniería de Telecomunicaciones",
        facultad: "Ingeniería Electrónica",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        planEstudios: "/mallas/uni-Telecomunicaciones.pdf",
        descripcion: "Redes de comunicación, fibra óptica y sistemas inalámbricos."
      },
      {
        nombre: "Ingeniería Económica",
        facultad: "Ingeniería Económica",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "https://acreditacion.uni.edu.pe/es/economics/curriculum/",
        descripcion: "Economía aplicada a proyectos de ingeniería."
      }
    ]
  },

  {
    id: 5,
    nombre: "Universidad Peruana de Ciencias Aplicadas",
    tipo: "Privada",
    logo: "/universidades/upc.png",
    webOficial: "https://www.upc.edu.pe",
    descripcion: "Universidad privada moderna con fuerte enfoque en tecnología, innovación y empleabilidad.",
    ubicacion: "Av. Alonso de Molina 1611, Monterrico, Santiago de Surco",
    telefono: "(01) 313-3333",
    costoMatricula: "S/. 900 - S/. 1,800",
    escalas: [
      { escala: "Escala A", rango: "S/. 2,500 - S/. 3,000 mensual" },
      { escala: "Escala B", rango: "S/. 2,000 - S/. 2,500 mensual" },
      { escala: "Escala C", rango: "S/. 1,500 - S/. 2,000 mensual" },
      { escala: "Escala D", rango: "S/. 1,000 - S/. 1,500 mensual" },
    ],
    carreras: [
      {
        nombre: "Ingeniería de Software",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 212,
        planEstudios: "/mallas/upc-software.pdf",
        descripcion: "Desarrollo ágil de software, DevOps y arquitectura de sistemas."
      },
      {
        nombre: "Diseño Gráfico",
        facultad: "Diseño",
        duracion: "10 ciclos (5 años)",
        creditos: 195,
        planEstudios: "/mallas/upc-diseño.pdf",
        descripcion: "Diseño digital, UX/UI y comunicación visual."
      },
      {
        nombre: "Negocios Internacionales",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "/mallas/upc-negocios.pdf",
        descripcion: "Comercio exterior, logística internacional y finanzas globales."
      },
      {
        nombre: "Comunicaciones",
        facultad: "Comunicación",
        duracion: "10 ciclos (5 años)",
        creditos: 198,
        planEstudios: "/mallas/upc-comunicacion.pdf",
        descripcion: "Comunicación corporativa, periodismo y medios digitales."
      },
      {
        nombre: "Arquitectura",
        facultad: "Arquitectura",
        duracion: "10 ciclos (5 años)",
        creditos: 225,
        planEstudios: "/mallas/upc-arquitectura.pdf",
        descripcion: "Arquitectura sostenible y diseño urbano contemporáneo."
      },
      {
        nombre: "Psicología",
        facultad: "Psicología",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/upc-psicologia.pdf",
        descripcion: "Psicología organizacional y clínica."
      },
      {
        nombre: "Administración",
        facultad: "Negocios",
        duracion: "10 ciclos (5 años)",
        creditos: 205,
        planEstudios: "/mallas/upc-administracion.pdf",
        descripcion: "Administración moderna con enfoque en liderazgo y tecnología."
      },
      {
        nombre: "Marketing",
        facultad: "Marketing",
        duracion: "10 ciclos (5 años)",
        creditos: 200,
        planEstudios: "/mallas/upc-marketing.pdf",
        descripcion: "Marketing digital, e-commerce y estrategia de marca."
      },
      {
        nombre: "Ingeniería Civil",
        facultad: "Ingeniería",
        duracion: "10 ciclos (5 años)",
        creditos: 220,
        planEstudios: "/mallas/upc-civil.pdf",
        descripcion: "Construcción, gestión de proyectos civiles y BIM."
      },
      {
        nombre: "Derecho",
        facultad: "Derecho",
        duracion: "10 ciclos (5 años)",
        creditos: 215,
        planEstudios: "/mallas/upc-derecho.pdf",
        descripcion: "Derecho empresarial y nuevas tecnologías jurídicas."
      }
    ]
  },

  {
    id: 6,
    nombre: "Universidad San Ignacio de Loyola",
    tipo: "Privada",
    logo: "/universidades/usil.png",
    webOficial: "https://www.usil.edu.pe",
    descripcion: "Universidad enfocada en emprendimiento, hotelería y negocios con proyección internacional.",
    ubicacion: "Av. La Fontana 550, La Molina, Lima",
    telefono: "(01) 317-1000",
    costoMatricula: "S/. 700 - S/. 1,400",
    escalas: [
      { escala: "Escala A", rango: "S/. 2,200 - S/. 2,800 mensual" },
      { escala: "Escala B", rango: "S/. 1,800 - S/. 2,200 mensual" },
      { escala: "Escala C", rango: "S/. 1,400 - S/. 1,800 mensual" },
      { escala: "Escala D", rango: "S/. 1,000 - S/. 1,400 mensual" },
    ],
    carreras: [
      { nombre: "Gastronomía", facultad: "Hotelería y Turismo", duracion: "8 ciclos (4 años)", creditos: 185, planEstudios: "https://usil.edu.pe/pregrado/arte-culinario/", descripcion: "Arte culinario, gestión gastronómica y cocina internacional." },
      { nombre: "Administración", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/usil-administracion.pdf", descripcion: "Administración con enfoque emprendedor e innovación." },
      { nombre: "Marketing", facultad: "Marketing", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/usil-marketing.pdf", descripcion: "Marketing experiencial y estrategia digital." },
      { nombre: "Ingeniería Empresarial", facultad: "Ingeniería", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios: "/mallas/usil-empresarial.pdf", descripcion: "Ingeniería aplicada a la gestión empresarial." },
      { nombre: "Comunicaciones", facultad: "Comunicación", duracion: "10 ciclos (5 años)", creditos: 198, planEstudios: "https://usil.edu.pe/cpel/comunicacion-publicidad/", descripcion: "Comunicación estratégica y relaciones públicas." },
      { nombre: "Arquitectura", facultad: "Arquitectura", duracion: "10 ciclos (5 años)", creditos: 225, planEstudios: "http://blogs.usil.edu.pe/facultad-arquitectura/arquitectura-urbanismo-y-territorio/malla-curricular-carrera-arquitectura-urbanismo-y-territorio", descripcion: "Arquitectura con énfasis en diseño sostenible." },
      { nombre: "Derecho", facultad: "Derecho", duracion: "10 ciclos (5 años)", creditos: 215, planEstudios: "/mallas/usil-derecho.pdf", descripcion: "Derecho corporativo y relaciones internacionales." },
      { nombre: "Psicología", facultad: "Psicología", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "https://usil.edu.pe/cpel/psicologia-humana/", descripcion: "Psicología organizacional y del consumidor." },
      { nombre: "Negocios Internacionales", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/usil-negocios.pdf", descripcion: "Comercio internacional y cadenas de suministro globales." },
      { nombre: "Contabilidad", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/usil-contabilidad.pdf", descripcion: "Contabilidad financiera y tributación empresarial." }
    ]
  },

  {
    id: 7,
    nombre: "Universidad Ricardo Palma",
    tipo: "Privada",
    logo: "/universidades/urp.png",
    webOficial: "https://www.urp.edu.pe",
    descripcion: "Universidad con tradición académica y amplia oferta de carreras en salud, ingeniería y humanidades.",
    ubicacion: "Av. Benavides 5440, Santiago de Surco, Lima",
    telefono: "(01) 708-0000",
    costoMatricula: "S/. 600 - S/. 1,200",
    escalas: [
      { escala: "Escala A", rango: "S/. 2,000 - S/. 2,500 mensual" },
      { escala: "Escala B", rango: "S/. 1,600 - S/. 2,000 mensual" },
      { escala: "Escala C", rango: "S/. 1,200 - S/. 1,600 mensual" },
      { escala: "Escala D", rango: "S/. 800 - S/. 1,200 mensual" },
    ],
    carreras: [
      { nombre: "Medicina", facultad: "Medicina", duracion: "14 ciclos (7 años)", creditos: 340, planEstudios: "/mallas/urp-medicina.pdf", descripcion: "Medicina clínica y salud preventiva." },
      { nombre: "Arquitectura", facultad: "Arquitectura", duracion: "10 ciclos (5 años)", creditos: 225, planEstudios: "/mallas/urp-arquitectura.pdf", descripcion: "Arquitectura y urbanismo contemporáneo." },
      { nombre: "Ingeniería Informática", facultad: "Ingeniería", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios: "/mallas/urp-informatica.pdf", descripcion: "Sistemas de información y desarrollo tecnológico." },
      { nombre: "Psicología", facultad: "Psicología", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/urp-psicologia.pdf", descripcion: "Psicología clínica y educativa." },
      { nombre: "Derecho", facultad: "Derecho", duracion: "10 ciclos (5 años)", creditos: 215, planEstudios: "/mallas/urp-derecho.pdf", descripcion: "Derecho penal, civil y constitucional." },
      { nombre: "Administración", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/urp-administracion.pdf", descripcion: "Gestión empresarial y dirección estratégica." },
      { nombre: "Marketing", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 198, planEstudios: "/mallas/urp-marketing.pdf", descripcion: "Investigación de mercados y publicidad." },
      { nombre: "Contabilidad", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/urp-contabilidad.pdf", descripcion: "Contabilidad y auditoría empresarial." },
      { nombre: "Traducción", facultad: "Humanidades", duracion: "10 ciclos (5 años)", creditos: 190, planEstudios: "/mallas/urp-traduccion.pdf", descripcion: "Traducción e interpretación en múltiples idiomas." },
      { nombre: "Biología", facultad: "Ciencias Biológicas", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/urp-biologia.pdf", descripcion: "Biología aplicada y biotecnología." }
    ]
  },

  {
    id: 8,
    nombre: "Universidad Científica del Sur",
    tipo: "Privada",
    logo: "/universidades/cientifica.png",
    webOficial: "https://www.cientifica.edu.pe",
    descripcion: "Universidad con fuerte enfoque en ciencias de la salud, medio ambiente y veterinaria.",
    ubicacion: "Antigua Carretera Panamericana Sur km 19, Villa El Salvador, Lima",
    telefono: "(01) 610-4848",
    costoMatricula: "S/. 700 - S/. 1,500",
    escalas: [
      { escala: "Escala A", rango: "S/. 2,200 - S/. 2,800 mensual" },
      { escala: "Escala B", rango: "S/. 1,700 - S/. 2,200 mensual" },
      { escala: "Escala C", rango: "S/. 1,200 - S/. 1,700 mensual" },
    ],
    carreras: [
      { nombre: "Medicina", facultad: "Medicina", duracion: "14 ciclos (7 años)", creditos: 340, planEstudios: "/mallas/cientifica-medicina.pdf", descripcion: "Medicina general con énfasis en investigación científica." },
      { nombre: "Odontología", facultad: "Ciencias de la Salud", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios: "/mallas/cientifica-odontologia.pdf", descripcion: "Salud bucal y odontología preventiva." },
      { nombre: "Psicología", facultad: "Psicología", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/cientifica-psicologia.pdf", descripcion: "Psicología clínica y neuropsicología." },
      { nombre: "Ingeniería Ambiental", facultad: "Ingeniería", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios: "/mallas/cientifica-ambiental.pdf", descripcion: "Gestión ambiental y sostenibilidad." },
      { nombre: "Administración", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/cientifica-administracion.pdf", descripcion: "Administración con enfoque en innovación." },
      { nombre: "Marketing", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 195, planEstudios: "/mallas/cientifica-marketing.pdf", descripcion: "Marketing digital y analítica de datos." },
      { nombre: "Veterinaria", facultad: "Veterinaria", duracion: "10 ciclos (5 años)", creditos: 220, planEstudios: "/mallas/cientifica-veterinaria.pdf", descripcion: "Medicina veterinaria y zootecnia." },
      { nombre: "Nutrición", facultad: "Ciencias de la Salud", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/cientifica-nutrcion.pdf", descripcion: "Nutrición clínica y salud pública." },
      { nombre: "Derecho", facultad: "Derecho", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios:  "/mallas/cientifica-derecho.pdf", descripcion: "Derecho ambiental y corporativo." },
      { nombre: "Biología Marina", facultad: "Ciencias Ambientales", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios: "/mallas/cientifica-biologia.pdf", descripcion: "Ecosistemas marinos y recursos hidrobiológicos." }
    ]
  },

  {
    id: 9,
    nombre: "Universidad ESAN",
    tipo: "Privada",
    logo: "/universidades/esan.png",
    webOficial: "https://www.esan.edu.pe",
    descripcion: "Líder en educación empresarial y de negocios en el Perú, con reconocimiento internacional.",
    ubicacion: "Alonso de Molina 1652, Monterrico, Santiago de Surco",
    telefono: "(01) 317-7200",
    costoMatricula: "S/. 1,000 - S/. 2,000",
    escalas: [
      { escala: "Escala A", rango: "S/. 2,800 - S/. 3,500 mensual" },
      { escala: "Escala B", rango: "S/. 2,200 - S/. 2,800 mensual" },
      { escala: "Escala C", rango: "S/. 1,600 - S/. 2,200 mensual" },
      { escala: "Escala D", rango: "S/. 1,000 - S/. 1,600 mensual" },
    ],
    carreras: [
      { nombre: "Administración", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios: "/mallas/esan-administracion", descripcion: "Administración de empresas con visión global." },
      { nombre: "Ingeniería de Tecnologías", facultad: "Ingeniería", duracion: "10 ciclos (5 años)", creditos: 212, planEstudios: "/mallas/esan-tecnologias", descripcion: "Tecnologías de información aplicadas a los negocios." },
      { nombre: "Marketing", facultad: "Marketing", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/esan-marketing", descripcion: "Marketing estratégico y gestión comercial." },
      { nombre: "Economía", facultad: "Economía", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "https://www.ue.edu.pe/pregrado/carreras/economia", descripcion: "Economía empresarial y análisis financiero." },
      { nombre: "Negocios Internacionales", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/esan-negocios", descripcion: "Comercio global, finanzas internacionales." },
      { nombre: "Contabilidad", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/esan-contabilidad", descripcion: "Contabilidad corporativa y finanzas." },
      { nombre: "Ingeniería Industrial", facultad: "Ingeniería", duracion: "10 ciclos (5 años)", creditos: 215, planEstudios: "https://www.ue.edu.pe/pregrado/carreras/ingenieria-industrial-comercial", descripcion: "Gestión de operaciones e ingeniería de procesos." },
      { nombre: "Finanzas", facultad: "Finanzas", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/esan-finanzas", descripcion: "Mercados financieros, inversiones y banca." },
      { nombre: "Derecho Corporativo", facultad: "Derecho", duracion: "10 ciclos (5 años)", creditos: 215, planEstudios: "https://www.ue.edu.pe/pregrado/carreras/derecho-corporativo", descripcion: "Derecho empresarial y regulatorio." },
      { nombre: "Comunicación", facultad: "Comunicación", duracion: "10 ciclos (5 años)", creditos: 195, planEstudios: "/mallas/esan-comunicacion", descripcion: "Comunicación corporativa y relaciones institucionales." }
    ]
  },

  {
    id: 10,
    nombre: "Universidad de San Martín de Porres",
    tipo: "Privada",
    logo: "/universidades/usmp.png",
    webOficial: "https://www.usmp.edu.pe",
    descripcion: "Una de las universidades más grandes del Perú con amplia oferta académica y presencia nacional.",
    ubicacion: "Av. Las Calandrias 151, Santa Anita, Lima",
    telefono: "(01) 362-0064",
    costoMatricula: "S/. 500 - S/. 1,000",
    escalas: [
      { escala: "Escala A", rango: "S/. 1,800 - S/. 2,500 mensual" },
      { escala: "Escala B", rango: "S/. 1,400 - S/. 1,800 mensual" },
      { escala: "Escala C", rango: "S/. 1,000 - S/. 1,400 mensual" },
      { escala: "Escala D", rango: "S/. 700 - S/. 1,000 mensual" },
    ],
    carreras: [
      { nombre: "Derecho", facultad: "Derecho", duracion: "10 ciclos (5 años)", creditos: 215, planEstudios: "https://derecho.usmp.edu.pe/plan_de_estudios/", descripcion: "Derecho civil, penal y empresarial." },
      { nombre: "Ingeniería de Computación", facultad: "Ingeniería", duracion: "10 ciclos (5 años)", creditos: 210, planEstudios: "/mallas/usmp-computacion", descripcion: "Computación, redes y sistemas de información." },
      { nombre: "Medicina", facultad: "Medicina", duracion: "14 ciclos (7 años)", creditos: 340, planEstudios: "/mallas/usmp-medicina", descripcion: "Medicina clínica y salud comunitaria." },
      { nombre: "Arquitectura", facultad: "Arquitectura", duracion: "10 ciclos (5 años)", creditos: 225, planEstudios: "/mallas/usmp-arquitectura", descripcion: "Arquitectura y diseño de interiores." },
      { nombre: "Contabilidad", facultad: "Ciencias Contables", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/usmp-contabilidad", descripcion: "Contabilidad, auditoría y tributación." },
      { nombre: "Psicología", facultad: "Psicología", duracion: "10 ciclos (5 años)", creditos: 200, planEstudios: "/mallas/usmp-psicologia", descripcion: "Psicología clínica, educativa y forense." },
      { nombre: "Administración", facultad: "Negocios", duracion: "10 ciclos (5 años)", creditos: 205, planEstudios: "/mallas/usmp-gestion", descripcion: "Gestión empresarial y emprendimiento." },
      { nombre: "Marketing", facultad: "Marketing", duracion: "10 ciclos (5 años)", creditos: 198, planEstudios: "/mallas/usmp-marketing", descripcion: "Marketing digital y gestión de marca." },
      { nombre: "Odontología", facultad: "Odontología", duracion: "10 ciclos (5 años)", creditos: 215, planEstudios: "/mallas/usmp-odontologia", descripcion: "Odontología general y especializada." },
      { nombre: "Turismo y Hotelería", facultad: "Turismo", duracion: "10 ciclos (5 años)", creditos: 195, planEstudios: "/mallas/usmp-turismo", descripcion: "Gestión hotelera y turismo sostenible." }
    ]
  }
];

export default universidades;
