/**
 * MathMaster - Estructura de Datos del Temario Curado y Ordenado Pedagógicamente
 * Orden de aprendizaje optimizado para Ciencias de la Computación:
 * 1. Aritmética (Cimientos)
 * 2. Álgebra (Lenguaje central)
 * 3. Álgebra Lineal Aplicada (Lay) [Justo después de Álgebra para asimilar vectores y matrices]
 * 4. Matemáticas Discretas (Rosen) [Estructuras de datos y lógica algorítmica]
 * 5. Geometría y Trigonometría (Bases visuales)
 * 6. Geometría Analítica (Coordenadas y curvas 2D)
 * 7. Cálculo Diferencial (Cambio y optimización)
 * 8. Cálculo Integral (Acumulación y áreas)
 * 9. Probabilidad y Estadística (Devore) [Bases de Machine Learning e inferencia]
 */

const MATH_CURRICULUM = [
  {
    id: "aritmetica",
    number: "I",
    title: "Aritmética",
    subtitle: "Cimientos numéricos y sistemas de numeración",
    color: "#10b981", // Emerald Green
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
          { id: "ari-2-7", title: "Algoritmo de la división" }
        ]
      },
      {
        id: "ari-cap-3",
        title: "Capítulo 3: Teoría de números",
        topics: [
          { id: "ari-3-1", title: "Divisibilidad y criterios de divisibilidad" },
          { id: "ari-3-2", title: "Números primos y compuestos" },
          { id: "ari-3-3", title: "Descomposición en factores primos" },
          { id: "ari-3-4", title: "Máximo Común Divisor (MCD)" },
          { id: "ari-3-5", title: "Mínimo Común Múltiplo (mcm)" }
        ]
      },
      {
        id: "ari-cap-4",
        title: "Capítulo 4: Números racionales (Fracciones)",
        topics: [
          { id: "ari-4-1", title: "Fracción común y clasificación" },
          { id: "ari-4-2", title: "Conversiones entre fracciones mixtas e impropias" },
          { id: "ari-4-3", title: "Fracciones equivalentes y simplificación" },
          { id: "ari-4-4", title: "Propiedades y recta numérica" },
          { id: "ari-4-5", title: "Suma y resta con igual denominador" },
          { id: "ari-4-6", title: "Suma y resta con diferente denominador" },
          { id: "ari-4-7", title: "Multiplicación y división de fracciones" },
          { id: "ari-4-8", title: "Operaciones combinadas con signos de agrupación" },
          { id: "ari-4-9", title: "Fracciones complejas" }
        ]
      },
      {
        id: "ari-cap-5",
        title: "Capítulo 5: Números decimales",
        topics: [
          { id: "ari-5-1", title: "Definición, lectura y escritura" },
          { id: "ari-5-2", title: "Suma y resta con decimales" },
          { id: "ari-5-3", title: "Multiplicación de decimales" },
          { id: "ari-5-4", title: "División con decimales" },
          { id: "ari-5-5", title: "Conversión de fracción a decimal y fracción generatriz" }
        ]
      },
      {
        id: "ari-cap-6",
        title: "Capítulo 6: Potenciación y radicación",
        topics: [
          { id: "ari-6-1", title: "Potenciación y teoremas de exponentes" },
          { id: "ari-6-2", title: "Radicación y teoremas de radicales" },
          { id: "ari-6-3", title: "Simplificación de radicales" },
          { id: "ari-6-4", title: "Operaciones con radicales" },
          { id: "ari-6-5", title: "Racionalización del denominador" },
          { id: "ari-6-6", title: "Cálculo de raíz cuadrada y cúbica" },
          { id: "ari-6-7", title: "Jerarquía de operaciones (PEMDAS)" }
        ]
      },
      {
        id: "ari-cap-7",
        title: "Capítulo 7: Notación científica y logaritmos",
        topics: [
          { id: "ari-7-1", title: "Notación científica y operaciones" },
          { id: "ari-7-2", title: "Potencias y raíces en notación científica" },
          { id: "ari-7-3", title: "Definición y logaritmo de un número" },
          { id: "ari-7-4", title: "Antilogaritmo" },
          { id: "ari-7-5", title: "Propiedades de los logaritmos" },
          { id: "ari-7-6", title: "Cambio de base en logaritmos" }
        ]
      },
      {
        id: "ari-cap-8",
        title: "Capítulo 8: Razones y proporciones",
        topics: [
          { id: "ari-8-1", title: "Razones y proporciones aritméticas/geométricas" },
          { id: "ari-8-2", title: "Media, tercera y cuarta proporcional" },
          { id: "ari-8-3", title: "Regla de tres simple (directa e inversa)" },
          { id: "ari-8-4", title: "Regla de tres compuesta" },
          { id: "ari-8-5", title: "Tanto por ciento (%) y aplicaciones" },
          { id: "ari-8-6", title: "Interés simple: capital, tiempo y tasa" }
        ]
      },
      {
        id: "ari-cap-9",
        title: "Capítulo 9: Sistemas de numeración computacional",
        note: "Omitidos sistemas antiguos; enfocado en bases informáticas.",
        topics: [
          { id: "ari-9-1", title: "Bases posicionales y notación polinómica" },
          { id: "ari-9-2", title: "Conversión de base B a base 10 (N(B) → N(10))" },
          { id: "ari-9-3", title: "Conversión de base 10 a base B (N(10) → N(B))" },
          { id: "ari-9-4", title: "Conversión Binario ↔ Octal (N(2) ↔ N(8))" },
          { id: "ari-9-5", title: "Conversión Binario ↔ Hexadecimal (N(2) ↔ N(16))" },
          { id: "ari-9-6", title: "Suma y resta en binario y hexadecimal" },
          { id: "ari-9-7", title: "Multiplicación y división binaria/hexadecimal" }
        ]
      },
      {
        id: "ari-cap-10",
        title: "Capítulo 10: Sistema métrico decimal y números denominados",
        topics: [
          { id: "ari-10-1", title: "Unidades de longitud, superficie, volumen y masa" },
          { id: "ari-10-2", title: "Números denominados: tiempo y medidas angulares" },
          { id: "ari-10-3", title: "Operaciones con números denominados" }
        ]
      },
      {
        id: "ari-cap-11",
        title: "Capítulo 11: Razonamiento aritmético",
        topics: [
          { id: "ari-11-1", title: "Problemas aplicados con números enteros y fracciones" },
          { id: "ari-11-2", title: "Problemas de agrupación y suma de divisores" },
          { id: "ari-11-3", title: "Repartimientos proporcionales" }
        ]
      }
    ]
  },
  {
    id: "algebra",
    number: "II",
    title: "Álgebra",
    subtitle: "El lenguaje de la programación y estructuras algebraicas",
    color: "#3b82f6", // Royal Blue
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    icon: "📐",
    chapters: [
      {
        id: "alg-cap-1",
        title: "Capítulo 1: Conjuntos y lógica proposicional",
        topics: [
          { id: "alg-1-1", title: "Simbología, conjuntos numéricos y representación" },
          { id: "alg-1-2", title: "Cardinalidad, subconjuntos y conjunto potencia" },
          { id: "alg-1-3", title: "Diagramas de Venn, unión, intersección y diferencia" },
          { id: "alg-1-4", title: "Álgebra de conjuntos y leyes booleanas" },
          { id: "alg-1-5", title: "Proposiciones compuestas y Leyes de De Morgan" },
          { id: "alg-1-6", title: "Condicionales, bicondicionales y tablas de verdad" },
          { id: "alg-1-7", title: "Producto cartesiano de conjuntos (A × B)" }
        ]
      },
      {
        id: "alg-cap-2",
        title: "Capítulo 2: Conceptos básicos de álgebra",
        topics: [
          { id: "alg-2-1", title: "Expresiones algebraicas y reducción de términos semejantes" },
          { id: "alg-2-2", title: "Valor numérico y traducción a lenguaje algebraico" },
          { id: "alg-2-3", title: "Suma, resta y supresión de signos de agrupación" },
          { id: "alg-2-4", title: "Multiplicación algebraica y leyes de exponentes" },
          { id: "alg-2-5", title: "División algebraica de polinomios" }
        ]
      },
      {
        id: "alg-cap-3",
        title: "Capítulo 3: Productos notables",
        topics: [
          { id: "alg-3-1", title: "Cuadrado de un binomio y trinomio" },
          { id: "alg-3-2", title: "Binomios conjugados (diferencia de cuadrados)" },
          { id: "alg-3-3", title: "Binomios con término común (x+a)(x+b)" },
          { id: "alg-3-4", title: "Cubo de un binomio y multiplicaciones notables" }
        ]
      },
      {
        id: "alg-cap-4",
        title: "Capítulo 4: Factorización",
        topics: [
          { id: "alg-4-1", title: "Factor común por monomio y por agrupación" },
          { id: "alg-4-2", title: "Diferencia de cuadrados y trinomio cuadrado perfecto" },
          { id: "alg-4-3", title: "Trinomio x² + bx + c y trinomio ax² + bx + c" },
          { id: "alg-4-4", title: "Suma o diferencia de cubos perfectos" },
          { id: "alg-4-5", title: "Completar el trinomio cuadrado perfecto" },
          { id: "alg-4-6", title: "División sintética (Regla de Ruffini)" }
        ]
      },
      {
        id: "alg-cap-5",
        title: "Capítulo 5: Fracciones algebraicas",
        topics: [
          { id: "alg-5-1", title: "MCD, mcm y simplificación de fracciones algebraicas" },
          { id: "alg-5-2", title: "Suma y resta con denominadores comunes y distintos" },
          { id: "alg-5-3", title: "Multiplicación y división de fracciones algebraicas" },
          { id: "alg-5-4", title: "Fracciones algebraicas complejas" }
        ]
      },
      {
        id: "alg-cap-6",
        title: "Capítulo 6: Ecuaciones de primer grado",
        topics: [
          { id: "alg-6-1", title: "Ecuaciones lineales enteras, con signos de agrupación y fraccionarias" },
          { id: "alg-6-2", title: "Ecuaciones lineales con valor absoluto y literales" },
          { id: "alg-6-3", title: "Problemas de aplicación: edades, mezclas, monedas y trabajo" },
          { id: "alg-6-4", title: "Despejes algebraicos de fórmulas" }
        ]
      },
      {
        id: "alg-cap-7",
        title: "Capítulo 7: Función lineal",
        topics: [
          { id: "alg-7-1", title: "Plano cartesiano y localización de coordenadas" },
          { id: "alg-7-2", title: "Definición de función, dominio y rango lineal" },
          { id: "alg-7-3", title: "Función lineal, pendiente y ordenada al origen" }
        ]
      },
      {
        id: "alg-cap-8",
        title: "Capítulo 8: Sistemas de ecuaciones",
        topics: [
          { id: "alg-8-1", title: "Sistemas 2x2: sustitución, igualación y reducción" },
          { id: "alg-8-2", title: "Sistemas 2x2: método de determinantes (Cramer) y gráfico" },
          { id: "alg-8-3", title: "Sistemas 3x3 por reducción y determinantes" },
          { id: "alg-8-4", title: "Descomposición en suma de fracciones parciales" }
        ]
      },
      {
        id: "alg-cap-9",
        title: "Capítulo 9: Potenciación y Teorema del Binomio",
        topics: [
          { id: "alg-9-1", title: "Factorial de un número (n!)" },
          { id: "alg-9-2", title: "Binomio de Newton y cálculo del término i-ésimo" },
          { id: "alg-9-3", title: "Triángulo de Pascal y propiedades binomiales" }
        ]
      },
      {
        id: "alg-cap-10",
        title: "Capítulo 10: Radicación",
        topics: [
          { id: "alg-10-1", title: "Exponentes fraccionarios y teoremas de radicales" },
          { id: "alg-10-2", title: "Operaciones con radicales de igual y distinto índice" },
          { id: "alg-10-3", title: "Racionalización del denominador y numerador" }
        ]
      },
      {
        id: "alg-cap-11",
        title: "Capítulo 11: Números complejos",
        topics: [
          { id: "alg-11-1", title: "Unidad imaginaria i y potencias cíclicas" },
          { id: "alg-11-2", title: "Forma binómica a + bi: suma, resta, multiplicación y división" },
          { id: "alg-11-3", title: "Representación en el plano de Argand, módulo y conjugado" }
        ]
      },
      {
        id: "alg-cap-12",
        title: "Capítulo 12: Ecuaciones de segundo grado",
        topics: [
          { id: "alg-12-1", title: "Fórmula general cuadrática y análisis del discriminante" },
          { id: "alg-12-2", title: "Solución por factorización y ecuaciones incompletas" },
          { id: "alg-12-3", title: "Vértice de la parábola y análisis de la función cuadrática" },
          { id: "alg-12-4", title: "Relación entre raíces y coeficientes (Vieta)" },
          { id: "alg-12-5", title: "Sistemas de ecuaciones cuadráticas" }
        ]
      },
      {
        id: "alg-cap-13",
        title: "Capítulo 13: Desigualdades",
        topics: [
          { id: "alg-13-1", title: "Propiedades y desigualdades lineales" },
          { id: "alg-13-2", title: "Desigualdades cuadráticas por intervalos" },
          { id: "alg-13-3", title: "Desigualdades racionales y método de los signos" },
          { id: "alg-13-4", title: "Desigualdades con valor absoluto" },
          { id: "alg-13-5", title: "Sistemas de desigualdades y regiones de solución" }
        ]
      },
      {
        id: "alg-cap-14",
        title: "Capítulo 14: Logaritmos",
        topics: [
          { id: "alg-14-1", title: "Definición y propiedades fundamentales" },
          { id: "alg-14-2", title: "Expansión y simplificación de expresiones" },
          { id: "alg-14-3", title: "Ecuaciones logarítmicas y exponenciales" }
        ]
      },
      {
        id: "alg-cap-15",
        title: "Capítulo 15: Progresiones (Vital para Análisis de Algoritmos)",
        topics: [
          { id: "alg-15-1", title: "Sucesiones y notación de sumatoria (∑)" },
          { id: "alg-15-2", title: "Progresión aritmética: término n-ésimo y suma de n términos" },
          { id: "alg-15-3", title: "Progresión geométrica: término n-ésimo y suma" },
          { id: "alg-15-4", title: "Progresión geométrica infinita (series convergentes)" },
          { id: "alg-15-5", title: "Aplicaciones: interés compuesto y depreciación" }
        ]
      },
      {
        id: "alg-cap-16",
        title: "Capítulo 16: Matrices",
        topics: [
          { id: "alg-16-1", title: "Definición, orden, dimensiones y tipos de matrices" },
          { id: "alg-16-2", title: "Operaciones: suma, producto por escalar y producto matricial" },
          { id: "alg-16-3", title: "Determinantes de 2x2 y 3x3" },
          { id: "alg-16-4", title: "Matriz inversa por eliminación de Gauss-Jordan" },
          { id: "alg-16-5", title: "Resolución matricial de sistemas de ecuaciones (A · X = B)" }
        ]
      },
      {
        id: "alg-cap-17",
        title: "Capítulo 17: Raíces de un polinomio",
        topics: [
          { id: "alg-17-1", title: "Teorema del Residuo y Teorema del Factor" },
          { id: "alg-17-2", title: "Cálculo de raíces por división sintética" },
          { id: "alg-17-3", title: "Regla de los signos de Descartes" }
        ]
      }
    ]
  },
  {
    id: "algebra-lineal-lay",
    number: "III",
    title: "Álgebra Lineal Aplicada",
    subtitle: "Vectores, matrices y transformaciones (David C. Lay)",
    color: "#6366f1", // Indigo
    gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    icon: "🧭",
    chapters: [
      {
        id: "lay-cap-1",
        title: "Capítulo 1: Sistemas de ecuaciones lineales (Repaso avanzado)",
        bibliography: "Álgebra Lineal y sus Aplicaciones (David C. Lay)",
        topics: [
          { id: "lay-1-1", title: "Ecuaciones lineales y notación matricial avanzada" },
          { id: "lay-1-2", title: "Reducción por filas y formas escalonadas" },
          { id: "lay-1-3", title: "Conjuntos solución de sistemas lineales" },
          { id: "lay-1-4", title: "Existencia y unicidad de soluciones en modelos matriciales" }
        ]
      },
      {
        id: "lay-cap-2",
        title: "Capítulo 2: Ecuaciones vectoriales y matriciales",
        bibliography: "Álgebra Lineal y sus Aplicaciones (David C. Lay)",
        topics: [
          { id: "lay-2-1", title: "Vectores en ℝ² y ℝⁿ: combinaciones lineales" },
          { id: "lay-2-2", title: "El espacio generado Span{v1, ..., vp}" },
          { id: "lay-2-3", title: "La ecuación matricial Ax = b" },
          { id: "lay-2-4", title: "Independencia lineal y dependencia en conjuntos de vectores" }
        ]
      },
      {
        id: "lay-cap-3",
        title: "Capítulo 3: Transformaciones lineales",
        bibliography: "Álgebra Lineal y sus Aplicaciones (David C. Lay)",
        topics: [
          { id: "lay-3-1", title: "Introducción a transformaciones lineales: T(u + v) y T(cu)" },
          { id: "lay-3-2", title: "La matriz de una transformación lineal" },
          { id: "lay-3-3", title: "Transformaciones geométricas en ℝ²: escalado, rotación, reflexión y corte (shear)" },
          { id: "lay-3-4", title: "Inyectividad (uno a uno) y sobreyectividad de transformaciones lineales" }
        ]
      },
      {
        id: "lay-cap-4",
        title: "Capítulo 4: Vectores propios y valores propios (Eigen)",
        bibliography: "Álgebra Lineal y sus Aplicaciones (David C. Lay)",
        note: "Solo la introducción esencial para CS / Machine Learning.",
        topics: [
          { id: "lay-4-1", title: "Definición conceptual: Ax = λx (Eigenvalues y Eigenvectors)" },
          { id: "lay-4-2", title: "La ecuación característica det(A - λI) = 0" },
          { id: "lay-4-3", title: "Espacios propios (Eigenspaces) y bases asociadas" },
          { id: "lay-4-4", title: "Interpretación geométrica e intuición en reducción dimensional (PCA)" }
        ]
      }
    ]
  },
  {
    id: "matematicas-discretas-rosen",
    number: "IV",
    title: "Matemáticas Discretas",
    subtitle: "Estructuras de datos, grafos y algoritmos (Kenneth H. Rosen)",
    color: "#0284c7", // Sky Blue Dark
    gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    icon: "🌳",
    chapters: [
      {
        id: "rosen-cap-1",
        title: "Capítulo 1: Fundamentos: Lógica y demostraciones",
        bibliography: "Matemáticas Discretas y sus Aplicaciones (Kenneth H. Rosen)",
        topics: [
          { id: "ros-1-1", title: "Lógica proposicional, equivalencias lógicas y predicados" },
          { id: "ros-1-2", title: "Cuantificadores universal (∀) y existencial (∃)" },
          { id: "ros-1-3", title: "Reglas de inferencia lógica" },
          { id: "ros-1-4", title: "Métodos de demostración: directa, por contrarecíproco y por contradicción" },
          { id: "ros-1-5", title: "Inducción matemática (principio inductivo para algoritmos recursivos)" }
        ]
      },
      {
        id: "rosen-cap-2",
        title: "Capítulo 2: Conteo avanzado",
        bibliography: "Matemáticas Discretas y sus Aplicaciones (Kenneth H. Rosen)",
        topics: [
          { id: "ros-2-1", title: "Regla del producto y regla de la suma" },
          { id: "ros-2-2", title: "El Principio del Palomar (Pigeonhole Principle)" },
          { id: "ros-2-3", title: "Permutaciones y combinaciones con y sin repetición" },
          { id: "ros-2-4", title: "Coeficientes binomiales e identidades de Pascal" }
        ]
      },
      {
        id: "rosen-cap-3",
        title: "Capítulo 3: Relaciones",
        bibliography: "Matemáticas Discretas y sus Aplicaciones (Kenneth H. Rosen)",
        topics: [
          { id: "ros-3-1", title: "Relaciones binarias y sus propiedades: reflexiva, simétrica, antisimétrica y transitiva" },
          { id: "ros-3-2", title: "Representación de relaciones (matrices booleanas y dígrafos)" },
          { id: "ros-3-3", title: "Relaciones de equivalencia y clases de equivalencia" },
          { id: "ros-3-4", title: "Relaciones de orden parcial (conjuntos ordenados / Posets)" }
        ]
      },
      {
        id: "rosen-cap-4",
        title: "Capítulo 4: Grafos",
        bibliography: "Matemáticas Discretas y sus Aplicaciones (Kenneth H. Rosen)",
        topics: [
          { id: "ros-4-1", title: "Terminología de grafos: vértices, aristas, grado y dígrafos" },
          { id: "ros-4-2", title: "Representación: matriz de adyacencia y listas de adyacencia" },
          { id: "ros-4-3", title: "Conectividad, trayectorias, caminos y ciclos" },
          { id: "ros-4-4", title: "Caminos y circuitos de Euler (recorrido de todas las aristas)" },
          { id: "ros-4-5", title: "Caminos y circuitos de Hamilton (recorrido de vértices)" },
          { id: "ros-4-6", title: "Grafos planos y coloreado de grafos (intro)" }
        ]
      },
      {
        id: "rosen-cap-5",
        title: "Capítulo 5: Árboles",
        bibliography: "Matemáticas Discretas y sus Aplicaciones (Kenneth H. Rosen)",
        topics: [
          { id: "ros-5-1", title: "Definición y propiedades de los árboles (grafos conexos sin ciclos)" },
          { id: "ros-5-2", title: "Árboles enraizados, nodos internos, hojas y altura" },
          { id: "ros-5-3", title: "Árboles binarios y recorridos de árboles (Pre-orden, En-orden, Post-orden)" },
          { id: "ros-5-4", title: "Árboles de búsqueda binaria (BST)" },
          { id: "ros-5-5", title: "Árboles de expansión (Spanning Trees) y árboles de expansión mínima (MST: Kruskal / Prim)" }
        ]
      }
    ]
  },
  {
    id: "geometria-trigonometria",
    number: "V",
    title: "Geometría y Trigonometría",
    subtitle: "Bases visuales para gráficos por computadora y vectores",
    color: "#f59e0b", // Amber
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
          { id: "geo-2-1", title: "Medidas angulares: sistema sexagesimal y circular (radianes)" },
          { id: "geo-2-2", title: "Conversión de grados a radianes y radianes a grados" },
          { id: "geo-2-3", title: "Clasificación de ángulos (agudos, rectos, obtusos, llanos)" },
          { id: "geo-2-4", title: "Ángulos complementarios, suplementarios y conjugados" }
        ]
      },
      {
        id: "geo-cap-3",
        title: "Capítulo 3: Rectas perpendiculares y paralelas",
        topics: [
          { id: "geo-3-1", title: "Perpendicularidad y paralelismo" },
          { id: "geo-3-2", title: "Ángulos opuestos por el vértice y adyacentes" },
          { id: "geo-3-3", title: "Rectas paralelas cortadas por una secante" }
        ]
      },
      {
        id: "geo-cap-4",
        title: "Capítulo 4: Triángulos",
        topics: [
          { id: "geo-4-1", title: "Clasificación por lados y ángulos" },
          { id: "geo-4-2", title: "Puntos notables (baricentro, circuncentro, ortocentro, incentro)" },
          { id: "geo-4-3", title: "Criterios de congruencia de triángulos" },
          { id: "geo-4-4", title: "Semejanza de triángulos y Teorema de Tales" },
          { id: "geo-4-5", title: "Teorema de Pitágoras y relaciones métricas" }
        ]
      },
      {
        id: "geo-cap-5",
        title: "Capítulo 5: Cuadriláteros y Polígonos",
        topics: [
          { id: "geo-5-1", title: "Clasificación y propiedades de cuadriláteros" },
          { id: "geo-5-2", title: "Polígonos: diagonales y suma de ángulos interiores" }
        ]
      },
      {
        id: "geo-cap-7",
        title: "Capítulo 7: Transformaciones geométricas 2D",
        topics: [
          { id: "geo-7-1", title: "Figuras a escala y factor de escala" },
          { id: "geo-7-2", title: "Traslación de figuras en el plano" },
          { id: "geo-7-3", title: "Rotación respecto a puntos y al origen" },
          { id: "geo-7-4", title: "Simetría axial y simetría central" }
        ]
      },
      {
        id: "geo-cap-8-9",
        title: "Capítulo 8 y 9: Circunferencia, áreas y perímetros",
        topics: [
          { id: "geo-8-1", title: "Radio, cuerda, diámetro, tangentes y ángulos en la circunferencia" },
          { id: "geo-9-1", title: "Perímetros y áreas de figuras planas y circulares" }
        ]
      },
      {
        id: "geo-cap-11-13",
        title: "Capítulos 11 al 13: Funciones trigonométricas y gráficas",
        topics: [
          { id: "geo-11-1", title: "Definición en triángulo rectángulo y signos en cuadrantes" },
          { id: "geo-12-1", title: "Valores exactos para ángulos notables (0°, 30°, 45°, 60°, 90°, etc.)" },
          { id: "geo-13-1", title: "Gráfica de funciones trigonométricas (amplitud, período y fase)" },
          { id: "geo-13-2", title: "Funciones trigonométricas inversas (arcsin, arccos, arctan)" }
        ]
      },
      {
        id: "geo-cap-14",
        title: "Capítulo 14: Identidades y ecuaciones trigonométricas",
        note: "Identidades básicas sin demostraciones complejas.",
        topics: [
          { id: "geo-14-1", title: "Identidades pitagóricas, recíprocas y por cociente" },
          { id: "geo-14-2", title: "Identidades de ángulo doble y suma de ángulos" },
          { id: "geo-14-3", title: "Resolución de ecuaciones trigonométricas estándar" }
        ]
      },
      {
        id: "geo-cap-15-17",
        title: "Capítulos 15 al 17: Triángulos y forma polar de complejos",
        topics: [
          { id: "geo-15-1", title: "Solución de triángulos rectángulos" },
          { id: "geo-16-1", title: "Ley de Senos y Ley de Cosenos" },
          { id: "geo-17-1", title: "Forma polar / trigonométrica z = r(cos θ + i sen θ)" },
          { id: "geo-17-2", title: "Teorema de De Moivre (potencias y raíces complejas)" }
        ]
      }
    ]
  },
  {
    id: "geometria-analitica",
    number: "VI",
    title: "Geometría Analítica",
    subtitle: "Coordenadas, rectas y trayectorias espaciales",
    color: "#8b5cf6", // Purple
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    icon: "📈",
    chapters: [
      {
        id: "ga-cap-1-3",
        title: "Capítulos 1 al 3: Coordenadas, distancias y pendientes",
        topics: [
          { id: "ga-1-1", title: "Distancia entre dos puntos en la recta y en el plano" },
          { id: "ga-1-2", title: "Punto medio y división de un segmento en una razón dada" },
          { id: "ga-2-1", title: "Área de un polígono mediante coordenadas (Fórmula del área de Gauss)" },
          { id: "ga-3-1", title: "Pendiente de una recta y ángulo de inclinación" },
          { id: "ga-3-2", title: "Condiciones de paralelismo (m1 = m2) y perpendicularidad (m1 · m2 = -1)" }
        ]
      },
      {
        id: "ga-cap-5",
        title: "Capítulo 5: La Línea recta",
        topics: [
          { id: "ga-5-1", title: "Ecuación punto-pendiente y forma por dos puntos" },
          { id: "ga-5-2", title: "Ecuación ordinaria: y = mx + b" },
          { id: "ga-5-3", title: "Ecuación general: Ax + By + C = 0" },
          { id: "ga-5-4", title: "Distancia de un punto a una recta" },
          { id: "ga-5-5", title: "Rectas notables en el triángulo (mediatriz, altura, bisectriz)" }
        ]
      },
      {
        id: "ga-cap-6-7",
        title: "Capítulo 6 y 7: Circunferencia y traslación de coordenadas",
        topics: [
          { id: "ga-6-1", title: "Ecuación ordinaria (x-h)² + (y-k)² = r² y forma general" },
          { id: "ga-6-2", title: "Detección de colisiones circulares en pantalla" },
          { id: "ga-7-1", title: "Traslación de ejes y nuevo sistema de coordenadas" }
        ]
      },
      {
        id: "ga-cap-12-13",
        title: "Capítulo 12 y 13: Coordenadas polares y paramétricas",
        topics: [
          { id: "ga-12-1", title: "Sistema polar (r, θ) y conversiones rectangulares/polares" },
          { id: "ga-12-2", title: "Ecuación polar de rectas y círculos" },
          { id: "ga-13-1", title: "Ecuaciones paramétricas x = f(t), y = g(t)" },
          { id: "ga-13-2", title: "Eliminación del parámetro y trayectorias temporales" }
        ]
      }
    ]
  },
  {
    id: "calculo-diferencial",
    number: "VII",
    title: "Cálculo Diferencial",
    subtitle: "Razón de cambio, optimización y bases de gradiente",
    color: "#ef4444", // Red
    gradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    icon: "📉",
    chapters: [
      {
        id: "cd-cap-1",
        title: "Capítulo 1: Relaciones y funciones",
        topics: [
          { id: "cd-1-1", title: "Definición de función, dominio y rango" },
          { id: "cd-1-2", title: "Familias de funciones (polinomiales, racionales, raíz, valor absoluto)" },
          { id: "cd-1-3", title: "Transformación de gráficas (desplazamientos y reflexiones)" },
          { id: "cd-1-4", title: "Composición de funciones (f ∘ g)(x) y función inversa f⁻¹(x)" },
          { id: "cd-1-5", title: "Funciones exponencial y logarítmica" }
        ]
      },
      {
        id: "cd-cap-2-3",
        title: "Capítulo 2 y 3: Límites y continuidad",
        topics: [
          { id: "cd-2-1", title: "Definición intuitiva y propiedades de límites" },
          { id: "cd-2-2", title: "Límites indeterminados (0/0) algebraicos" },
          { id: "cd-2-3", title: "Límites infinitos, asíntotas verticales y horizontales" },
          { id: "cd-2-4", title: "Límites trigonométricos notables (lim sin x / x)" },
          { id: "cd-3-1", title: "Continuidad puntual y tipos de discontinuidades" },
          { id: "cd-3-2", title: "Teorema del Valor Intermedio" }
        ]
      },
      {
        id: "cd-cap-4",
        title: "Capítulo 4: La Derivada",
        topics: [
          { id: "cd-4-1", title: "Interpretación geométrica (recta tangente) y definición por el límite" },
          { id: "cd-4-2", title: "Reglas básicas: constante, potencia, suma y resta" },
          { id: "cd-4-3", title: "Regla del producto y regla del cociente" },
          { id: "cd-4-4", title: "Regla de la Cadena (derivada de funciones compuestas)" },
          { id: "cd-4-5", title: "Derivadas de funciones trigonométricas, exponenciales y logaritmos" },
          { id: "cd-4-6", title: "Derivación implícita y derivadas de orden superior" }
        ]
      },
      {
        id: "cd-cap-5",
        title: "Capítulo 5: Aplicaciones de la derivada y optimización",
        note: "Omitidos problemas físicos; enfocado en optimización y regla de L'Hôpital.",
        topics: [
          { id: "cd-5-1", title: "Ecuación de la recta tangente y normal a una curva" },
          { id: "cd-5-2", title: "Criterio de la primera derivada: puntos críticos, máximos y mínimos" },
          { id: "cd-5-3", title: "Criterio de la segunda derivada: concavidad e inflexión" },
          { id: "cd-5-4", title: "Problemas de Optimización global" },
          { id: "cd-5-5", title: "Regla de L'Hôpital para formas 0/0 e ∞/∞" },
          { id: "cd-5-6", title: "Diferenciales y aproximaciones lineales locales" }
        ]
      }
    ]
  },
  {
    id: "calculo-integral",
    number: "VIII",
    title: "Cálculo Integral",
    subtitle: "Acumulación, integrales analíticas y áreas",
    color: "#06b6d4", // Cyan
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    icon: "∫",
    chapters: [
      {
        id: "ci-cap-1-2",
        title: "Capítulos 1 y 2: Sumas de Riemann e integrales inmediatas",
        topics: [
          { id: "ci-1-1", title: "Notación sigma y aproximación por rectángulos" },
          { id: "ci-1-2", title: "Definición formal de la integral definida" },
          { id: "ci-2-1", title: "Antiderivadas y constante de integración C" },
          { id: "ci-2-2", title: "Fórmulas de integración inmediata" },
          { id: "ci-2-3", title: "Integración por cambio de variable (sustitución u)" }
        ]
      },
      {
        id: "ci-cap-4",
        title: "Capítulo 4: Métodos de integración esenciales",
        note: "Concentrado en los 2 métodos troncales analíticos.",
        topics: [
          { id: "ci-4-1", title: "Integración por partes (∫ u dv = uv - ∫ v du)" },
          { id: "ci-4-2", title: "Fracciones parciales con factores lineales" },
          { id: "ci-4-3", title: "Fracciones parciales con factores cuadráticos irreducibles" }
        ]
      },
      {
        id: "ci-cap-5",
        title: "Capítulo 5: Aplicaciones de la integral",
        topics: [
          { id: "ci-5-1", title: "Teorema Fundamental del Cálculo (Partes 1 y 2)" },
          { id: "ci-5-2", title: "Área bajo la curva respecto al eje x" },
          { id: "ci-5-3", title: "Área entre dos curvas f(x) y g(x)" },
          { id: "ci-5-4", title: "Integración numérica: Regla del Trapecio y Simpson" }
        ]
      },
      {
        id: "ci-cap-6",
        title: "Capítulo 6: Ecuaciones diferenciales básicas",
        topics: [
          { id: "ci-6-1", title: "Definición, orden y grado de ecuaciones diferenciales" },
          { id: "ci-6-2", title: "Ecuaciones diferenciales por variables separables" },
          { id: "ci-6-3", title: "Modelos exponenciales de cambio" }
        ]
      }
    ]
  },
  {
    id: "probabilidad-estadistica-devore",
    number: "IX",
    title: "Probabilidad y Estadística",
    subtitle: "Inferencia y fundamentos de Machine Learning (Jay L. Devore)",
    color: "#ec4899", // Pink
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    icon: "📊",
    chapters: [
      {
        id: "devore-cap-1",
        title: "Capítulo 1: Estadística descriptiva",
        bibliography: "Probabilidad y Estadística para Ingeniería y Ciencias (Jay L. Devore)",
        topics: [
          { id: "dev-1-1", title: "Poblaciones, muestras y tipos de datos numéricos/categóricos" },
          { id: "dev-1-2", title: "Representaciones gráficas: histogramas, diagramas de dispersión y cajas (Boxplots)" },
          { id: "dev-1-3", title: "Medidas de ubicación: media muestral, mediana y percentiles" },
          { id: "dev-1-4", title: "Medidas de dispersión: varianza muestral (s²) y desviación estándar (s)" }
        ]
      },
      {
        id: "devore-cap-2",
        title: "Capítulo 2: Teoría de probabilidad y Teorema de Bayes",
        bibliography: "Probabilidad y Estadística para Ingeniería y Ciencias (Jay L. Devore)",
        topics: [
          { id: "dev-2-1", title: "Espacios muestrales, eventos y diagramas de Venn de probabilidad" },
          { id: "dev-2-2", title: "Axiomas de probabilidad y reglas de adición" },
          { id: "dev-2-3", title: "Probabilidad condicional P(A|B) y regla de la multiplicación" },
          { id: "dev-2-4", title: "Eventos independientes vs mutuamente excluyentes" },
          { id: "dev-2-5", title: "Regla de probabilidad total" },
          { id: "dev-2-6", title: "Teorema de Bayes (Cálculo de probabilidad a posteriori para clasificadores de ML)" }
        ]
      },
      {
        id: "devore-cap-3",
        title: "Capítulo 3: Variables aleatorias discretas",
        bibliography: "Probabilidad y Estadística para Ingeniería y Ciencias (Jay L. Devore)",
        topics: [
          { id: "dev-3-1", title: "Concepto de variable aleatoria discreta y función de masa de probabilidad (PMF)" },
          { id: "dev-3-2", title: "Esperanza matemática E[X] (media) y varianza Var[X]" },
          { id: "dev-3-3", title: "Distribución de Bernoulli y Distribución Binomial" },
          { id: "dev-3-4", title: "Distribución de Poisson (modelado de eventos por unidad de tiempo/espacio)" }
        ]
      },
      {
        id: "devore-cap-4",
        title: "Capítulo 4: Variables aleatorias continuas",
        bibliography: "Probabilidad y Estadística para Ingeniería y Ciencias (Jay L. Devore)",
        topics: [
          { id: "dev-4-1", title: "Función de densidad de probabilidad (PDF) y relación con integrales" },
          { id: "dev-4-2", title: "Función de distribución acumulada (CDF)" },
          { id: "dev-4-3", title: "Esperanza y varianza de variables continuas" },
          { id: "dev-4-4", title: "Distribución Normal estándar (campana de Gauss) y estandarización z" },
          { id: "dev-4-5", title: "Teorema del Límite Central (intuición para ciencia de datos)" }
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MATH_CURRICULUM;
}
