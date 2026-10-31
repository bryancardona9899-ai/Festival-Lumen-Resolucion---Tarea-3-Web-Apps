# Festival Lumen - Cartelera sin choques: Análisis de algoritmos

## Propósito del Programa
El Festival Lumen organiza varias proyecciones de cortometrajes en salas y horarios compartidos. Este módulo desarrolla funciones en JavaScript para detectar solapamientos, validar códigos, construir índices y analizar la complejidad algorítmica sin dependencias externas.

## Requisitos de Ejecución
- **Node.js**: La solución se ejecuta con Node.js y no requiere paquetes externos.

## Comando de Ejecución
`node src/cartelera.js`

## Formato de los Datos
El arreglo `proyecciones` contiene objetos estructurados con los siguientes campos:

* **`codigo`** (Texto): Identificador único en la entrada válida (letras mayúsculas, un guion y dos dígitos).
* **`titulo`** (Texto): Nombre del cortometraje (no participa en los cálculos).
* **`sala`** (Texto): Identificador de la sala, por ejemplo, A o B.
* **`inicio`** (Entero): Hora de inicio en minutos desde las 00:00 (entre 0 y 1_440).
* **`fin`** (Entero): Hora de finalización en minutos desde las 00:00; siempre es mayor que `inicio`.

## Salidas de los Casos de Prueba (C1 a C8)

* **C1 (Códigos únicos):** `unicos` es `true` y `duplicados` es `[]` con la entrada de demostración.
* **C2 (Código repetido):** Con `[AUR-01, LUM-02, AUR-01]`, `unicos` es `false` y `duplicados` es `["AUR-01"]`.
* **C3 (Búsqueda presente):** El código `"LUM-02"` devuelve `indice = 1` y `comparaciones = 2`.
* **C4 (Búsqueda ausente):** El código `"ZZZ-99"` devuelve `indice = -1` y `comparaciones = 6`.
* **C5 (Consulta con índice):** Ambas estrategias devuelven los índices `[0, 5, -1]`.
* **C6 (Choques de sala):** Existen exactamente los choques `AUR-01/LUM-02` y `NUB-04/SOL-05`.
* **C7 (Límite de intervalos):** LUM-02 termina en 660 y RIV-03 comienza en 660; la pareja no aparece en la salida.
* **C8 (Entrada sin proyecciones):** Con `[]`, `unicos = true`, búsquedas devuelven `-1` y choques `[]`.

## Análisis de Complejidad y Parámetros (n y q)
- **n**: Cantidad de proyecciones en la cartelera.
- **q**: Cantidad de consultas de códigos realizadas.

### Tabla de Pares Evaluados para Detectar Choques ($O(n^2)$)
| n (Proyecciones) | Pares Evaluados ($n(n-1)/2$) |
|--------------------|-----------------------------|
| 10                 | 45                          |
| 100                | 4,950                       |
| 1,000              | 499,500                     |

### Intercambio (Trade-off) entre Búsqueda Lineal e Índice Map
1. **Búsqueda lineal repetida q veces**: Se modela como $O(q \times n)$ en tiempo, con un espacio auxiliar de $O(1)$.
2. **Búsqueda mediante Map**: Presenta un tiempo de preparación de $O(n)$ y un espacio auxiliar de $O(n)$, ofreciendo un costo promedio esperado de $O(1)$ por consulta.
3. **Decisión algorítmica**: El índice consume memoria adicional ($O(n)$); por lo tanto, si $q$ es muy pequeño, puede ser preferible conservar la estrategia lineal sin índice, mientras que para un alto número de consultas el Map optimiza drásticamente el rendimiento.