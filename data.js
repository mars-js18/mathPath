/**
 * MathMaster - Estructura de Datos del Temario Curado y Ordenado
 * Basado en el libro oficial CONAMAT y depurado/ampliado para Ciencias de la Computación.
 */

const MATH_CURRICULUM = [
  {
    id: "aritmetica",
    number: "I",
    title: "Aritmética",
    subtitle: "Cimientos numéricos y sistemas computacionales",
    description: "La base esencial desde cero para el razonamiento numérico, divisibilidad y sistemas binarios/hexadecimales.",
    color: "#10b981", // Duolingo Green
    lightColor: "#ecfdf5",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    icon: "🧮",
    chapters: [
      {
        id: "ari-cap-1",
        title: "Capítulo 1: Números reales",
        topics: [
          { id: "ari-1-1", title: "Clasificación de los números reales" },
          { id: "ari-1-2", title: "Propiedades de los números reales" },
          { id: "ari-1-3", title: "Lectura y escritura de números" },
          { id: "ari-1-4", title: "Orden y comparación en la recta" },
          { id: "ari-1-5", title: "Valor absoluto de un número" },
          { id: "ari-1-6", title: "Valor absoluto y relativo del sistema posicional decimal" }
        ]
      },
      {
        id: "ari-cap-2",
        title: "Capítulo 2: Números enteros",
        topics: [
          { id: "ari-2-1", title: "Suma de enteros y ley de signos" },
          { id: "ari-2-2", title: "Resta de enteros" },
          { id: "ari-2-3", title: "Suma y resta con signos de agrupación" },
          { id: "ari-2-4", title: "Multiplicación de enteros" },
          { id: "ari-2-5", title: "Multiplicación con signos de agrupación" },
          { id: "ari-2-6", title: "División de enteros" },
          { id: "ari-2-7", title: "Algoritmo de la división (dividendo, divisor, cociente, residuo)" }
        ]
      },
      {
        id: "ari-cap-3",
        title: "Capítulo 3: Teoría de números",
        topics: [
          { id: "ari-3-1", title: "Divisibilidad y criterios de divisibilidad (2, 3, 5, 7, etc.)" },
          { id: "ari-3-2", title: "Números primos y compuestos" },
          { id: "ari-3-3", title: "Descomposición en factores primos (Teorema Fundamental)" },
          { id: "ari-3-4", title: "Máximo Común Divisor (MCD)" },
          { id: "ari-3-5", title: "Mínimo Común Múltiplo (mcm)" }
        ]
      },
      {
        id: "ari-cap-4",
        title: "Capítulo 4: Números racionales (Fracciones)",
        topics: [
          { id: "ari-4-1", title: "Fracción común y clasificación (propias, impropias, mixtas)" },
          { id: "ari-4-2", title: "Conversiones entre fracciones mixtas e impropias" },
          { id: "ari-4-3", title: "Fracciones equivalentes y amplificación/simplificación" },
          { id: "ari-4-4", title: "Propiedades y ubicación en la recta numérica" },
          { id: "ari-4-5", title: "Suma y resta con igual denominador" },
          { id: "ari-4-6", title: "Suma y resta con diferente denominador (vía mcm)" },
          { id: "ari-4-7", title: "Multiplicación y división de fracciones" },
          { id: "ari-4-8", title: "Operaciones combinadas con signos de agrupación" },
          { id: "ari-4-9", title: "Fracciones complejas (fracciones continuas)" }
        ]
      },
      {
        id: "ari-cap-5",
        title: "Capítulo 5: Números decimales",
        topics: [
          { id: "ari-5-1", title: "Definición, lectura y escritura de decimales" },
          { id: "ari-5-2", title: "Suma y resta con decimales" },
          { id: "ari-5-3", title: "Multiplicación de decimales" },
          { id: "ari-5-4", title: "División con decimales" },
          { id: "ari-5-5", title: "Conversión de fracción a decimal y de decimal a fracción generatriz" }
        ]
      },
      {
        id: "ari-cap-6",
        title: "Capítulo 6: Potenciación y radicación",
        topics: [
          { id: "ari-6-1", title: "Potenciación y teoremas de los exponentes" },
          { id: "ari-6-2", title: "Radicación y teoremas de los radicales" },
          { id: "ari-6-3", title: "Simplificación de radicales" },
          { id: "ari-6-4", title: "Suma, resta, multiplicación y división de radicales" },
          { id: "ari-6-5", title: "Racionalización del denominador" },
          { id: "ari-6-6", title: "Cálculo de raíz cuadrada y raíz cúbica" },
          { id: "ari-6-7", title: "Jerarquía de operaciones (PEMDAS / BODMAS)" }
        ]
      },
      {
        id: "ari-cap-7",
        title: "Capítulo 7: Notación científica y logaritmos",
        topics: [
          { id: "ari-7-1", title: "Notación científica: concepto y representación" },
          { id: "ari-7-2", title: "Operaciones en notación científica (suma, resta, mult, div)" },
          { id: "ari-7-3", title: "Potencias y raíces en notación científica" },
          { id: "ari-7-4", title: "Definición y logaritmo de un número" },
          { id: "ari-7-5", title: "Antilogaritmo y características" },
          { id: "ari-7-6", title: "Propiedades de los logaritmos" },
          { id: "ari-7-7", title: "Cambio de base en logaritmos" }
        ]
      },
      {
        id: "ari-cap-8",
        title: "Capítulo 8: Razones y proporciones",
        topics: [
          { id: "ari-8-1", title: "Cantidades proporcionales y razón geométrica/aritmética" },
          { id: "ari-8-2", title: "Proporciones y propiedad fundamental" },
          { id: "ari-8-3", title: "Media proporcional, tercera y cuarta proporcional" },
          { id: "ari-8-4", title: "Regla de tres simple (directa e inversa)" },
          { id: "ari-8-5", title: "Regla de tres compuesta" },
          { id: "ari-8-6", title: "Tanto por ciento (%) y aplicaciones" },
          { id: "ari-8-7", title: "Interés simple: capital, tiempo y tasa" }
        ]
      },
      {
        id: "ari-cap-9",
        title: "Capítulo 9: Sistemas de numeración (Computacional)",
        note: "Optimizado para informática: omitidos sistemas arcaicos (maya, egipcio, romano).",
        topics: [
          { id: "ari-9-1", title: "Definición de base posicional y notación polifónica" },
          { id: "ari-9-2", title: "Conversión de base B a base 10 (N(B) → N(10))" },
          { id: "ari-9-3", title: "Conversión de base 10 a base B (N(10) → N(B)) por divisiones sucesivas" },
          { id: "ari-9-4", title: "Conversión Binario ↔ Octal (N(2) ↔ N(8))" },
          { id: "ari-9-5", title: "Conversión Binario ↔ Hexadecimal (N(2) ↔ N(16))" },
          { id: "ari-9-6", title: "Suma y resta en bases distintas de 10 (Binario y Hexadecimal)" },
          { id: "ari-9-7", title: "Multiplicación y división en base binaria/hexadecimal" }
        ]
      },
      {
        id: "ari-cap-10",
        title: "Capítulo 10: Sistema métrico decimal y números denominados",
        topics: [
          { id: "ari-10-1", title: "Sistema métrico: unidades de longitud y equivalencias" },
          { id: "ari-10-2", title: "Unidades de superficie y volumen" },
          { id: "ari-10-3", title: "Unidades de masa y equivalencias" },
          { id: "ari-10-4", title: "Números denominados: tiempo y medidas angulares" },
          { id: "ari-10-5", title: "Operaciones aritméticas con números denominados" }
        ]
      },
      {
        id: "ari-cap-11",
        title: "Capítulo 11: Razonamiento aritmético",
        topics: [
          { id: "ari-11-1", title: "Problemas aplicados con números enteros" },
          { id: "ari-11-2", title: "Problemas aplicados con fracciones" },
          { id: "ari-11-3", title: "Problemas de agrupación y conteo básico" },
          { id: "ari-11-4", title: "Suma de los divisores de un número" },
          { id: "ari-11-5", title: "Problemas de repartimientos proporcionales" }
        ]
      }
    ]
  },
  {
    id: "algebra",
    number: "II",
    title: "Álgebra",
    subtitle: "El lenguaje de la programación y los algoritmos",
    description: "Bloque nuclear completísimo: lógica booleana, conjuntos, matrices, progresiones y polinomios.",
    color: "#3b82f6", // Khan Academy Blue
    lightColor: "#eff6ff",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    icon: "📐",
    chapters: [
      {
        id: "alg-cap-1",
        title: "Capítulo 1: Conjuntos y lógica (Fundamentos de CS)",
        topics: [
          { id: "alg-1-1", title: "Simbología y tipos de conjuntos numéricos" },
          { id: "alg-1-2", title: "Escritura, representación y cardinalidad de conjuntos" },
          { id: "alg-1-3", title: "Conjuntos equivalentes, iguales, disjuntos y subconjuntos" },
          { id: "alg-1-4", title: "Conjunto potencia y conjunto universo" },
          { id: "alg-1-5", title: "Diagramas de Venn y operaciones: Unión, Intersección" },
          { id: "alg-1-6", title: "Diferencia de conjuntos y conjunto complemento" },
          { id: "alg-1-7", title: "Álgebra de conjuntos y leyes booleanas" },
          { id: "alg-1-8", title: "Lógica proposicional: tipos de proposiciones compuestas" },
          { id: "alg-1-9", title: "Leyes de De Morgan en lógica y conjuntos" },
          { id: "alg-1-10", title: "Proposiciones condicionales y bicondicionales" },
          { id: "alg-1-11", title: "Construcción de tablas de verdad (Tautologías, contradicciones)" },
          { id: "alg-1-12", title: "Producto cartesiano de conjuntos (A × B)" }
        ]
      },
      {
        id: "alg-cap-2",
        title: "Capítulo 2: Conceptos básicos de álgebra",
        topics: [
          { id: "alg-2-1", title: "Expresiones algebraicas y reducción de términos semejantes" },
          { id: "alg-2-2", title: "Valor numérico de una expresión" },
          { id: "alg-2-3", title: "Lenguaje algebraico y traducción de enunciados" },
          { id: "alg-2-4", title: "Polinomios: suma y resta" },
          { id: "alg-2-5", title: "Signos de agrupación y reglas de supresión" },
          { id: "alg-2-6", title: "Multiplicación algebraica y leyes de exponentes" },
          { id: "alg-2-7", title: "División algebraica (monomios, polinomios)" }
        ]
      },
      {
        id: "alg-cap-3",
        title: "Capítulo 3: Productos notables",
        topics: [
          { id: "alg-3-1", title: "Cuadrado de un binomio (a ± b)²" },
          { id: "alg-3-2", title: "Cuadrado de un trinomio (a + b + c)²" },
          { id: "alg-3-3", title: "Binomios conjugados (diferencia de cuadrados)" },
          { id: "alg-3-4", title: "Binomios con término común (x + a)(x + b)" },
          { id: "alg-3-5", title: "Cubo de un binomio (a ± b)³" },
          { id: "alg-3-6", title: "Multiplicaciones complejas con productos notables" }
        ]
      },
      {
        id: "alg-cap-4",
        title: "Capítulo 4: Factorización",
        topics: [
          { id: "alg-4-1", title: "Factor común monomio y polinomio" },
          { id: "alg-4-2", title: "Factor común por agrupación de términos" },
          { id: "alg-4-3", title: "Diferencia de cuadrados" },
          { id: "alg-4-4", title: "Trinomio cuadrado perfecto (TCP)" },
          { id: "alg-4-5", title: "Trinomio de la forma x² + bx + c" },
          { id: "alg-4-6", title: "Trinomio de la forma ax² + bx + c" },
          { id: "alg-4-7", title: "Suma o diferencia de cubos perfectos" },
          { id: "alg-4-8", title: "Suma o diferencia de potencias impares iguales" },
          { id: "alg-4-9", title: "Factorización completando el trinomio cuadrado perfecto" },
          { id: "alg-4-10", title: "Descomposición factorial por división sintética (Ruffini)" }
        ]
      },
      {
        id: "alg-cap-5",
        title: "Capítulo 5: Fracciones algebraicas",
        topics: [
          { id: "alg-5-1", title: "MCD y mcm de expresiones algebraicas" },
          { id: "alg-5-2", title: "Simplificación de fracciones algebraicas" },
          { id: "alg-5-3", title: "Suma y resta con denominador común" },
          { id: "alg-5-4", title: "Suma y resta con diferente denominador" },
          { id: "alg-5-5", title: "Multiplicación y división de fracciones algebraicas" },
          { id: "alg-5-6", title: "Operaciones combinadas y fracciones complejas" }
        ]
      },
      {
        id: "alg-cap-6",
        title: "Capítulo 6: Ecuaciones de primer grado",
        topics: [
          { id: "alg-6-1", title: "Ecuaciones de 1er grado con una incógnita" },
          { id: "alg-6-2", title: "Ecuaciones con signos de agrupación y fraccionarias" },
          { id: "alg-6-3", title: "Ecuaciones con valor absoluto y ecuaciones con literales" },
          { id: "alg-6-4", title: "Problemas de aplicación: números, edades, mezclas, monedas" },
          { id: "alg-6-5", title: "Problemas de trabajo conjunto, distancias y tiempos" },
          { id: "alg-6-6", title: "Despeje analítico de fórmulas" }
        ]
      },
      {
        id: "alg-cap-7",
        title: "Capítulo 7: Función lineal",
        topics: [
          { id: "alg-7-1", title: "Plano cartesiano y localización de puntos" },
          { id: "alg-7-2", title: "Concepto de función, dominio y rango lineal" },
          { id: "alg-7-3", title: "Función constante y recta vertical x = k" },
          { id: "alg-7-4", title: "Función lineal: pendiente e intercepto y = mx + b" }
        ]
      },
      {
        id: "alg-cap-8",
        title: "Capítulo 8: Sistemas de ecuaciones",
        topics: [
          { id: "alg-8-1", title: "Sistemas 2x2: Métodos de Sustitución, Igualación y Reducción" },
          { id: "alg-8-2", title: "Sistemas 2x2: Método Gráfico y Método de Determinantes (Cramer)" },
          { id: "alg-8-3", title: "Sistemas que se reducen a lineales" },
          { id: "alg-8-4", title: "Sistemas 3x3: Reducción y Regla de Cramer 3x3" },
          { id: "alg-8-5", title: "Descomposición en suma de fracciones parciales" }
        ]
      },
      {
        id: "alg-cap-9",
        title: "Capítulo 9: Potenciación y Teorema del Binomio",
        topics: [
          { id: "alg-9-1", title: "Teoremas avanzados de exponentes" },
          { id: "alg-9-2", title: "Factorial de un número (n!)" },
          { id: "alg-9-3", title: "Binomio de Newton y coeficientes binomiales" },
          { id: "alg-9-4", title: "Cálculo directo del término i-ésimo" },
          { id: "alg-9-5", title: "Construcción y propiedades del Triángulo de Pascal" }
        ]
      },
      {
        id: "alg-cap-10",
        title: "Capítulo 10: Radicación",
        topics: [
          { id: "alg-10-1", title: "Exponentes fraccionarios y radicales" },
          { id: "alg-10-2", title: "Simplificación e introducción de factores bajo el radical" },
          { id: "alg-10-3", title: "Operaciones con radicales de igual y distinto índice" },
          { id: "alg-10-4", title: "Racionalización del denominador (monomio y binomio)" },
          { id: "alg-10-5", title: "Racionalización del numerador" }
        ]
      },
      {
        id: "alg-cap-11",
        title: "Capítulo 11: Números complejos",
        topics: [
          { id: "alg-11-1", title: "Unidad imaginaria i y potencias cíclicas de i" },
          { id: "alg-11-2", title: "Forma binómica a + bi: Suma, resta, multiplicación y división" },
          { id: "alg-11-3", title: "Representación gráfica en el plano complejo de Argand" },
          { id: "alg-11-4", title: "Módulo (valor absoluto) y conjugado de un complejo" }
        ]
      },
      {
        id: "alg-cap-12",
        title: "Capítulo 12: Ecuaciones de segundo grado",
        topics: [
          { id: "alg-12-1", title: "Fórmula general cuadrática y discriminante" },
          { id: "alg-12-2", title: "Solución por factorización y ecuaciones incompletas" },
          { id: "alg-12-3", title: "Análisis y vértice de la función cuadrática" },
          { id: "alg-12-4", title: "Relación entre raíces y coeficientes (Vieta)" },
          { id: "alg-12-5", title: "Ecuaciones con radicales reductibles a cuadráticas" },
          { id: "alg-12-6", title: "Sistemas cuadrático-lineales y cuadráticos" }
        ]
      },
      {
        id: "alg-cap-13",
        title: "Capítulo 13: Desigualdades",
        topics: [
          { id: "alg-13-1", title: "Propiedades y desigualdades lineales con una variable" },
          { id: "alg-13-2", title: "Desigualdades cuadráticas (método de casos y método de intervalos)" },
          { id: "alg-13-3", title: "Desigualdades racionales y método del cementerio/intervalos" },
          { id: "alg-13-4", title: "Desigualdades con expresiones factorizadas (x-a)(x-b)..." },
          { id: "alg-13-5", title: "Desigualdades con valor absoluto |x| < a y |x| > a" },
          { id: "alg-13-6", title: "Sistemas de desigualdades lineales y regiones factibles" }
        ]
      },
      {
        id: "alg-cap-14",
        title: "Capítulo 14: Logaritmos",
        topics: [
          { id: "alg-14-1", title: "Definición rigurosa y propiedades logarítmicas" },
          { id: "alg-14-2", title: "Expansión y condensación de expresiones con logaritmos" },
          { id: "alg-14-3", title: "Ecuaciones logarítmicas" },
          { id: "alg-14-4", title: "Ecuaciones exponenciales" }
        ]
      },
      {
        id: "alg-cap-15",
        title: "Capítulo 15: Progresiones (Vital para Análisis de Algoritmos)",
        topics: [
          { id: "alg-15-1", title: "Sucesiones infinitas y notación de sumatoria (∑)" },
          { id: "alg-15-2", title: "Progresión aritmética: término n-ésimo y suma de n términos" },
          { id: "alg-15-3", title: "Interpolación de medios aritméticos y promedios" },
          { id: "alg-15-4", title: "Progresión geométrica: término n-ésimo y suma de n términos" },
          { id: "alg-15-5", title: "Progresión geométrica infinita decreciente (series convergentes)" },
          { id: "alg-15-6", title: "Aplicaciones prácticas: Interés compuesto y depreciación" }
        ]
      },
      {
        id: "alg-cap-16",
        title: "Capítulo 16: Matrices",
        topics: [
          { id: "alg-16-1", title: "Definición, orden, notación matricial y tipos de matrices" },
          { id: "alg-16-2", title: "Operaciones: Escalar, Suma y Producto matricial" },
          { id: "alg-16-3", title: "Propiedades algebraicas del producto de matrices" },
          { id: "alg-16-4", title: "Determinantes de orden 2 y orden 3 (Sarrus / cofactores)" },
          { id: "alg-16-5", title: "Matriz inversa por el método de Gauss-Jordan" },
          { id: "alg-16-6", title: "Resolución matricial de sistemas de ecuaciones (A · X = B)" }
        ]
      },
      {
        id: "alg-cap-17",
        title: "Capítulo 17: Raíces de un polinomio",
        topics: [
          { id: "alg-17-1", title: "Teorema del Residuo y Teorema del Factor" },
          { id: "alg-17-2", title: "Cálculo de raíces reales y complejas por división sintética" },
          { id: "alg-17-3", title: "Regla de los signos de Descartes" }
        ]
      }
    ]
  },
  {
    id: "geometria-trigonometria",
    number: "III",
    title: "Geometría y Trigonometría",
    subtitle: "Bases visuales para gráficos por computadora y vectores",
    description: "Depurado para informática: transformaciones 2D, triángulos, funciones trigonométricas y forma polar compleja.",
    color: "#f59e0b", // Duolingo Gold / Amber
    lightColor: "#fffbeb",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    icon: "📐",
    chapters: [
      {
        id: "geo-cap-1",
        title: "Capítulo 1: Conceptos básicos de geometría",
        topics: [
          { id: "geo-1-1", title: "Punto, recta, plano, segmentos y postulados de Euclides" }
        ]
      },
      {
        id: "geo-cap-2",
        title: "Capítulo 2: Ángulos",
        topics: [
          { id: "geo-2-1", title: "Medidas angulares: sistema sexagesimal y sistema circular (radianes)" },
          { id: "geo-2-2", title: "Conversión de grados a radianes y radianes a grados" },
          { id: "geo-2-3", title: "Clasificación de ángulos (agudos, rectos, obtusos, llanos, perigonales)" },
          { id: "geo-2-4", title: "Ángulos complementarios, suplementarios y conjugados" }
        ]
      },
      {
        id: "geo-cap-3",
        title: "Capítulo 3: Rectas perpendiculares y paralelas",
        topics: [
          { id: "geo-3-1", title: "Perpendicularidad y paralelismo" },
          { id: "geo-3-2", title: "Ángulos opuestos por el vértice y adyacentes" },
          { id: "geo-3-3", title: "Rectas paralelas cortadas por una secante (alternos y correspondientes)" }
        ]
      },
      {
        id: "geo-cap-4",
        title: "Capítulo 4: Triángulos",
        topics: [
          { id: "geo-4-1", title: "Clasificación por lados y por ángulos" },
          { id: "geo-4-2", title: "Rectas y puntos notables (baricentro, circuncentro, ortocentro, incentro)" },
          { id: "geo-4-3", title: "Teoremas fundamentales y criterios de congruencia" },
          { id: "geo-4-4", title: "Semejanza de triángulos y Teorema de Tales" },
          { id: "geo-4-5", title: "Teorema de Pitágoras y relaciones métricas en triángulos rectángulos" }
        ]
      },
      {
        id: "geo-cap-5",
        title: "Capítulo 5: Cuadriláteros",
        topics: [
          { id: "geo-5-1", title: "Clasificación y propiedades de paralelogramos, rectángulos y rombos" },
          { id: "geo-5-2", title: "Propiedades de trapecios y trapezoides" }
        ]
      },
      {
        id: "geo-cap-6",
        title: "Capítulo 6: Polígonos",
        topics: [
          { id: "geo-6-1", title: "Clasificación, elementos y cálculo de diagonales totales" },
          { id: "geo-6-2", title: "Suma de ángulos interiores y exteriores de un polígono" }
        ]
      },
      {
        id: "geo-cap-7",
        title: "Capítulo 7: Transformaciones geométricas (Esencial para Gráficos)",
        topics: [
          { id: "geo-7-1", title: "Figuras a escala y factor de escala" },
          { id: "geo-7-2", title: "Traslación de figuras en el plano" },
          { id: "geo-7-3", title: "Rotación respecto al origen y puntos" },
          { id: "geo-7-4", title: "Simetría axial y simetría central (reflexiones)" }
        ]
      },
      {
        id: "geo-cap-8",
        title: "Capítulo 8: Circunferencia y círculo",
        topics: [
          { id: "geo-8-1", title: "Radio, cuerda, diámetro, secante y tangente" },
          { id: "geo-8-2", title: "Ángulos en la circunferencia (central, inscrito, semi-inscrito)" },
          { id: "geo-8-3", title: "Propiedades fundamentales de las tangentes" }
        ]
      },
      {
        id: "geo-cap-9",
        title: "Capítulo 9: Perímetros y superficies",
        topics: [
          { id: "geo-9-1", title: "Perímetros y áreas de figuras planas y polígonos regulares" },
          { id: "geo-9-2", title: "Área de círculo, sector circular y figuras combinadas" }
        ]
      },
      {
        id: "geo-cap-11",
        title: "Capítulo 11: Funciones trigonométricas",
        topics: [
          { id: "geo-11-1", title: "Definición en triángulo rectángulo (SohCahToa) y cofunciones" },
          { id: "geo-11-2", title: "Signos de las funciones trigonométricas en los 4 cuadrantes" },
          { id: "geo-11-3", title: "Funciones para ángulos negativos y mayores a 90°" },
          { id: "geo-11-4", title: "Círculo trigonométrico unitario" }
        ]
      },
      {
        id: "geo-cap-12",
        title: "Capítulo 12: Ángulos notables",
        topics: [
          { id: "geo-12-1", title: "Valores exactos para 0°, 90°, 180°, 270° y 360°" },
          { id: "geo-12-2", title: "Valores exactos para ángulos notables: 30°, 45° y 60°" },
          { id: "geo-12-3", title: "Aplicaciones prácticas con valores notables" }
        ]
      },
      {
        id: "geo-cap-13",
        title: "Capítulo 13: Gráficas de funciones trigonométricas",
        topics: [
          { id: "geo-13-1", title: "Gráfica de seno y coseno (ondas senoidales)" },
          { id: "geo-13-2", title: "Gráfica de tangente, cotangente, secante y cosecante" },
          { id: "geo-13-3", title: "Amplitud, período y ángulo de fase" },
          { id: "geo-13-4", title: "Gráficas de funciones trigonométricas inversas (arcsin, arccos, arctan)" }
        ]
      },
      {
        id: "geo-cap-14",
        title: "Capítulo 14: Identidades y ecuaciones trigonométricas (Básicas)",
        note: "Omitidas demostraciones exhaustivas y transformaciones complejas.",
        topics: [
          { id: "geo-14-1", title: "Identidades pitagóricas, recíprocas y por cociente" },
          { id: "geo-14-2", title: "Identidades de suma/diferencia y ángulo doble sen(2θ), cos(2θ)" },
          { id: "geo-14-3", title: "Resolución de ecuaciones trigonométricas estándar" }
        ]
      },
      {
        id: "geo-cap-15-16",
        title: "Capítulo 15 y 16: Resolución de triángulos",
        topics: [
          { id: "geo-15-1", title: "Solución de triángulos rectángulos y problemas de altura/distancia" },
          { id: "geo-16-1", title: "Ley de los Senos para triángulos oblicuángulos" },
          { id: "geo-16-2", title: "Ley de los Cosenos para triángulos oblicuángulos" }
        ]
      },
      {
        id: "geo-cap-17",
        title: "Capítulo 17: Forma trigonométrica de números complejos",
        topics: [
          { id: "geo-17-1", title: "Forma polar / trigonométrica z = r(cos θ + i sen θ)" },
          { id: "geo-17-2", title: "Multiplicación, división y Teorema de De Moivre (potencias y raíces)" }
        ]
      }
    ]
  },
  {
    id: "geometria-analitica",
    number: "IV",
    title: "Geometría Analítica",
    subtitle: "Coordenadas, líneas y transformaciones espaciales",
    description: "Centrada en el desarrollo de interfaces, videojuegos y visión computacional (descartadas cónicas complejas de física).",
    color: "#8b5cf6", // Purple
    lightColor: "#f5f3ff",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    icon: "📈",
    chapters: [
      {
        id: "ga-cap-1",
        title: "Capítulo 1: Geometría analítica unidimensional",
        topics: [
          { id: "ga-1-1", title: "Segmento de recta y distancia entre dos puntos" },
          { id: "ga-1-2", title: "División de un segmento en una razón dada y punto medio" }
        ]
      },
      {
        id: "ga-cap-2",
        title: "Capítulo 2: Geometría analítica bidimensional",
        topics: [
          { id: "ga-2-1", title: "Localización de puntos en el plano cartesiano (x, y)" },
          { id: "ga-2-2", title: "Distancia euclidiana entre dos puntos" },
          { id: "ga-2-3", title: "Punto medio y puntos de trisección en 2D" },
          { id: "ga-2-4", title: "Cálculo del área de polígonos mediante determinantes (Shoelace formula)" }
        ]
      },
      {
        id: "ga-cap-3",
        title: "Capítulo 3: Pendiente de una recta",
        topics: [
          { id: "ga-3-1", title: "Definición de pendiente (m) y ángulo de inclinación" },
          { id: "ga-3-2", title: "Condición analítica de paralelismo (m1 = m2)" },
          { id: "ga-3-3", title: "Condición analítica de perpendicularidad (m1 · m2 = -1)" },
          { id: "ga-3-4", title: "Cálculo del ángulo entre dos rectas" }
        ]
      },
      {
        id: "ga-cap-5",
        title: "Capítulo 5: La Línea recta",
        topics: [
          { id: "ga-5-1", title: "Ecuación punto-pendiente y recta por dos puntos" },
          { id: "ga-5-2", title: "Forma ordinaria pendiente-ordenada al origen: y = mx + b" },
          { id: "ga-5-3", title: "Forma general: Ax + By + C = 0" },
          { id: "ga-5-4", title: "Forma simétrica y forma normal de la recta" },
          { id: "ga-5-5", title: "Distancia perpendicular de un punto a una recta" },
          { id: "ga-5-6", title: "Rectas notables en el triángulo (mediatriz, mediana, altura, bisectriz)" }
        ]
      },
      {
        id: "ga-cap-6",
        title: "Capítulo 6: Circunferencia",
        topics: [
          { id: "ga-6-1", title: "Definición y forma ordinaria con centro (h, k): (x-h)² + (y-k)² = r²" },
          { id: "ga-6-2", title: "Forma canónica con centro en el origen: x² + y² = r²" },
          { id: "ga-6-3", title: "Forma general y conversión completando cuadrados" },
          { id: "ga-6-4", title: "Detección de colisiones circulares (Bounding Circles en videojuegos)" }
        ]
      },
      {
        id: "ga-cap-7",
        title: "Capítulo 7: Transformación de coordenadas",
        topics: [
          { id: "ga-7-1", title: "Traslación de ejes paralelos" },
          { id: "ga-7-2", title: "Transformación de curvas trasladando el origen" },
          { id: "ga-7-3", title: "Transformación y simplificación de ecuaciones" }
        ]
      },
      {
        id: "ga-cap-12",
        title: "Capítulo 12: Coordenadas polares",
        topics: [
          { id: "ga-12-1", title: "Sistema polar (r, θ) y gráfica de puntos" },
          { id: "ga-12-2", title: "Conversión de coordenadas polares a rectangulares y viceversa" },
          { id: "ga-12-3", title: "Transformación de ecuaciones cartesianas a polares" },
          { id: "ga-12-4", title: "Ecuación polar de rectas y circunferencias" }
        ]
      },
      {
        id: "ga-cap-13",
        title: "Capítulo 13: Ecuaciones paramétricas",
        topics: [
          { id: "ga-13-1", title: "Definición y curvas en el tiempo t: x = f(t), y = g(t)" },
          { id: "ga-13-2", title: "Eliminación del parámetro para obtener la ecuación rectangular" },
          { id: "ga-13-3", title: "Parametrización trigonométrica de trayectorias" }
        ]
      }
    ]
  },
  {
    id: "calculo-diferencial",
    number: "V",
    title: "Cálculo Diferencial",
    subtitle: "Razón de cambio, optimización y bases de Machine Learning",
    description: "Esencial para entender gradientes, derivadas, mínimos y convergencia de algoritmos.",
    color: "#ef4444", // Duolingo Red / Ruby
    lightColor: "#fef2f2",
    gradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    icon: "📉",
    chapters: [
      {
        id: "cd-cap-1",
        title: "Capítulo 1: Relaciones y funciones",
        topics: [
          { id: "cd-1-1", title: "Concepto de relación, función y notación f(x)" },
          { id: "cd-1-2", title: "Dominio, contradominio y rango" },
          { id: "cd-1-3", title: "Familias de funciones: Polinomiales, racionales, raíz, valor absoluto" },
          { id: "cd-1-4", title: "Desplazamientos, alargamientos y reflexiones de gráficas" },
          { id: "cd-1-5", title: "Funciones crecientes, decrecientes, inyectivas, suprayectivas y biyectivas" },
          { id: "cd-1-6", title: "Composición de funciones (f ∘ g)(x)" },
          { id: "cd-1-7", title: "Función inversa f⁻¹(x)" },
          { id: "cd-1-8", title: "Funciones trascendentes: exponenciales y trigonométricas" }
        ]
      },
      {
        id: "cd-cap-2",
        title: "Capítulo 2: Límites",
        topics: [
          { id: "cd-2-1", title: "Definición intuitiva y gráfica de límite" },
          { id: "cd-2-2", title: "Propiedades y teoremas de los límites algebraicos" },
          { id: "cd-2-3", title: "Límites indeterminados (0/0) mediante factorización y racionalización" },
          { id: "cd-2-4", title: "Límites laterales y límites que tienden al infinito (∞/∞)" },
          { id: "cd-2-5", title: "Asíntotas horizontales, verticales y oblicuas" },
          { id: "cd-2-6", title: "Límites trigonométricos notables: lim sin(x)/x cuando x→0" }
        ]
      },
      {
        id: "cd-cap-3",
        title: "Capítulo 3: Continuidad",
        topics: [
          { id: "cd-3-1", title: "Continuidad puntual (las 3 condiciones)" },
          { id: "cd-3-2", title: "Discontinuidad evitable vs no evitable (de salto)" },
          { id: "cd-3-3", title: "Continuidad en intervalos abiertos y cerrados" },
          { id: "cd-3-4", title: "Teorema del Valor Intermedio y Teorema de Bolzano" }
        ]
      },
      {
        id: "cd-cap-4",
        title: "Capítulo 4: La Derivada",
        topics: [
          { id: "cd-4-1", title: "Interpretación geométrica (pendiente de la secante a la tangente)" },
          { id: "cd-4-2", title: "Definición formal por el límite y regla de los cuatro pasos" },
          { id: "cd-4-3", title: "Reglas básicas: constante, potencia, suma y resta" },
          { id: "cd-4-4", title: "Regla del producto y regla del cociente" },
          { id: "cd-4-5", title: "Regla de la Cadena (derivada de funciones compuestas)" },
          { id: "cd-4-6", title: "Derivadas de funciones trigonométricas, exponenciales y logarítmicas" },
          { id: "cd-4-7", title: "Derivación implícita" },
          { id: "cd-4-8", title: "Derivadas de orden superior (f'', f''', ...)" }
        ]
      },
      {
        id: "cd-cap-5",
        title: "Capítulo 5: Aplicaciones de la derivada (Optimización en CS)",
        note: "Enfocado en optimización y regla de L'Hôpital para análisis computacional.",
        topics: [
          { id: "cd-5-1", title: "Recta tangente y normal en un punto" },
          { id: "cd-5-2", title: "Criterio de la primera derivada: puntos críticos y monotonía" },
          { id: "cd-5-3", title: "Criterio de la segunda derivada: concavidad e inflexión" },
          { id: "cd-5-4", title: "Problemas de Optimización (Máximos y Mínimos globales)" },
          { id: "cd-5-5", title: "Regla de L'Hôpital para formas indeterminadas 0/0 y ∞/∞" },
          { id: "cd-5-6", title: "Teorema de Rolle y Teorema del Valor Medio" },
          { id: "cd-5-7", title: "Diferenciales y aproximaciones lineales locales" }
        ]
      }
    ]
  },
  {
    id: "calculo-integral",
    number: "VI",
    title: "Cálculo Integral",
    subtitle: "Áreas, funciones acumulativas y probabilidad continua",
    description: "Concepto de integración, sumas finitas, métodos esenciales y ecuaciones diferenciales básicas.",
    color: "#06b6d4", // Cyan / Teal
    lightColor: "#ecfeff",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    icon: "∫",
    chapters: [
      {
        id: "ci-cap-1",
        title: "Capítulo 1: Sumas de Riemann",
        topics: [
          { id: "ci-1-1", title: "Notación sigma y propiedades de sumatorias" },
          { id: "ci-1-2", title: "Aproximación por rectángulos inscritos y circunscritos" },
          { id: "ci-1-3", title: "Definición formal de la integral definida como paso al límite" }
        ]
      },
      {
        id: "ci-cap-2",
        title: "Capítulo 2: Integrales inmediatas",
        topics: [
          { id: "ci-2-1", title: "Concepto de antiderivada y constante de integración C" },
          { id: "ci-2-2", title: "Fórmulas de integración inmediata (potencias, exponenciales)" },
          { id: "ci-2-3", title: "Integración por cambio de variable (sustitución simple u-sub)" }
        ]
      },
      {
        id: "ci-cap-4",
        title: "Capítulo 4: Métodos de integración (Los esenciales)",
        note: "Omitidas sustituciones trigonométricas pesadas; concentrado en los 2 pilares analíticos.",
        topics: [
          { id: "ci-4-1", title: "Integración por partes (∫ u dv = uv - ∫ v du)" },
          { id: "ci-4-2", title: "Integración por fracciones parciales (factores lineales distintos y repetidos)" },
          { id: "ci-4-3", title: "Integración por fracciones parciales (factores cuadráticos irreducibles)" }
        ]
      },
      {
        id: "ci-cap-5",
        title: "Capítulo 5: Aplicaciones de la integral",
        note: "Enfocado en áreas e integración definida (fundamento para funciones de densidad de probabilidad).",
        topics: [
          { id: "ci-5-1", title: "Teorema Fundamental del Cálculo (Partes 1 y 2)" },
          { id: "ci-5-2", title: "Cálculo y propiedades de la integral definida" },
          { id: "ci-5-3", title: "Área bajo la curva respecto al eje x" },
          { id: "ci-5-4", title: "Área entre dos curvas f(x) y g(x)" },
          { id: "ci-5-5", title: "Integración numérica: Regla del Trapecio y Regla de Simpson" }
        ]
      },
      {
        id: "ci-cap-6",
        title: "Capítulo 6: Ecuaciones diferenciales básicas",
        topics: [
          { id: "ci-6-1", title: "Definición, orden y grado de una ecuación diferencial" },
          { id: "ci-6-2", title: "Ecuaciones diferenciales de primer orden por variables separables" },
          { id: "ci-6-3", title: "Modelos exponenciales básicos (crecimiento y decaimiento)" }
        ]
      }
    ]
  },
  {
    id: "computacion-esencial",
    number: "VII",
    title: "Módulos Esenciales de Computación",
    subtitle: "Álgebra Lineal, Matemáticas Discretas y Probabilidad",
    description: "Bloque imprescindible para Computer Science, Desarrollo de Software, Inteligencia Artificial y Algoritmos.",
    color: "#ec4899", // Rose / Pink / Fuchsia
    lightColor: "#fdf2f8",
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    icon: "🚀",
    chapters: [
      {
        id: "cs-cap-a",
        title: "Módulo A: Álgebra Lineal Aplicada (Vectores y Gráficos)",
        bibliography: "Álgebra Lineal y sus Aplicaciones (David C. Lay)",
        topics: [
          { id: "cs-a-1", title: "Vectores en el plano (ℝ²) y en el espacio (ℝ³): Magnitud y Dirección" },
          { id: "cs-a-2", title: "Suma vectorial, resta y multiplicación por escalares" },
          { id: "cs-a-3", title: "Producto escalar (punto): proyecciones, cosenos y ortogonalidad" },
          { id: "cs-a-4", title: "Producto vectorial (cruz) en ℝ³: vectores normales y áreas" },
          { id: "cs-a-5", title: "Independencia lineal y bases vectoriales" },
          { id: "cs-a-6", title: "Transformaciones lineales básicas (escalado, rotación, reflexión)" },
          { id: "cs-a-7", title: "Valores propios y vectores propios (Eigenvalues & Eigenvectors - Intro)" }
        ]
      },
      {
        id: "cs-cap-b",
        title: "Módulo B: Matemáticas Discretas (Estructuras de Datos y Algoritmos)",
        bibliography: "Matemáticas Discretas y sus Aplicaciones (Kenneth H. Rosen)",
        topics: [
          { id: "cs-b-1", title: "Teoría de Grafos: Vértices, aristas, grafos dirigidos (dígrafos) y no dirigidos" },
          { id: "cs-b-2", title: "Grafos ponderados, caminos, ciclos y conectividad" },
          { id: "cs-b-3", title: "Matriz de adyacencia y lista de adyacencia" },
          { id: "cs-b-4", title: "Árboles: Árboles enraizados, árboles binarios y recorridos (Pre, In, Post-order)" },
          { id: "cs-b-5", title: "Árboles de búsqueda binaria (BST) y Árboles de expansión mínima (Spanning Trees)" },
          { id: "cs-b-6", title: "Relaciones de recurrencia y resolución para análisis de complejidad de algoritmos" },
          { id: "cs-b-7", title: "Técnicas de conteo avanzadas: Principio de inclusión-exclusión y Casillas de palomar" },
          { id: "cs-b-8", title: "Permutaciones, combinaciones y particiones discretas" }
        ]
      },
      {
        id: "cs-cap-c",
        title: "Módulo C: Probabilidad y Estadística (Bases de Machine Learning)",
        bibliography: "Probabilidad y Estadística para Ingeniería y Ciencias (Jay L. Devore)",
        topics: [
          { id: "cs-c-1", title: "Estadística descriptiva: media, mediana, moda, varianza y desviación estándar" },
          { id: "cs-c-2", title: "Espacio muestral, eventos, axiomas de Kolmogorov y asignación de probabilidad" },
          { id: "cs-c-3", title: "Eventos independientes y regla de la multiplicación" },
          { id: "cs-c-4", title: "Probabilidad condicional y regla de la probabilidad total" },
          { id: "cs-c-5", title: "Teorema de Bayes (Pilar de clasificadores y Machine Learning)" },
          { id: "cs-c-6", title: "Variables aleatorias discretas: Distribución Binomial y Distribución de Poisson" },
          { id: "cs-c-7", title: "Variables aleatorias continuas: Función de densidad y Distribución Normal (Gaussiana)" },
          { id: "cs-c-8", title: "Esperanza matemática E[X] y Varianza Var[X]" }
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MATH_CURRICULUM;
}
