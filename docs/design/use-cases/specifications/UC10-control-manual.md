| **Caso de uso**      | **Control manual** |
| :---        | :---        |
| **Identificador**      | UC10 |
| **Actores**      | Administrador |
| **Precondición**   | El equipo **NO** debe estar ejecutando una tarea actualmente. |
| **Resultado**   | El usuario puede controlar el equipo de forma manual. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda controlar el equipo de forma manual, con fines de depuración o calibración del equipo; o validación de comandos/archivos.

**Conceptos previos:** La vista de control manual y calibración cuenta con los siguientes elementos:
- Monitor de estado: Indica el estado actual del equipo (posición, velocidad de avance, velocidad de giro de cabezal, herramienta, estado de alarma, etc).
- Panel de control: Contiene varias pestañas con diferentes menúes de utilidades (Acciones básicas, macros de código, control manual).
- Terminal: Está compuesto por un emulador de terminal donde se ve todo el código que se envía y se recibe del dispositivo, además de una entrada de texto para enviar comandos manualmente al equipo.
- Editor de código: Editor de texto plano con capacidad de crear, abrir y modificar archivos de código G.

---

| **Sub-caso de uso**      | **Movimiento incremental** |
| :---        | :---        |
| **Identificador**      | UC10a |
| **Actores**      | Administrador |
| **Precondición**   | -- |
| **Resultado**   | El usuario puede mover de forma incremental (en pasos) el equipo de forma manual. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda mover el cabezal del equipo de forma incremental en la dirección deseada.

**Curso normal (básico):**

| **N**      | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---        | :---        | :---        |
| 1      | En el menú principal, selecciona la opción de "Control manual y calibración". |  |
| 2      | Selecciona el puerto serie del equipo y presiona "Conectar". |  |
| 3      |  | Inicia un canal de comunicación bidireccional con el servidor. |
| 4      |  | Inicia la comunicación por puerto serie con el equipo. |
| 5      |  | Habilita el uso del panel de control y el terminal. |
| 6      | Va al panel de control y selecciona la pestaña de "jog". |  |
| 7      | Configura el "paso" en cada coordenada, y la velocidad de avance (feed rate). |  |
| 8      | Cliquea uno de los botones de dirección. |  |
| 9      |  | Deshabilita los controles, muestra un ícono de carga y envía al servidor la solicitud. |
| 10     |  | Recibe el comando generado de GRBL y lo escribe en el terminal. |
| 11     |  | Recibe del servidor el resultado de ejecución del comando. |
| 12     |  | Actualiza las coordenadas del cabezal en el monitor de estado, muestra la respuesta del dispositivo en el terminal y habilita los controles. |

---

| **Sub-caso de uso**      | **Movimiento absoluto** |
| :---        | :---        |
| **Identificador**      | UC10b |
| **Actores**      | Administrador |
| **Precondición**   | -- |
| **Resultado**   | El usuario puede mover el equipo de forma manual a la posición indicada. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda mover el cabezal del equipo a una coordenada específica.

**Curso normal (básico):**

| **N**      | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---        | :---        | :---        |
| 1      | En el menú principal, selecciona la opción de "Control manual y calibración". |  |
| 2      | Selecciona el puerto serie del equipo y presiona "Conectar". |  |
| 3      |  | Inicia un canal de comunicación bidireccional con el servidor. |
| 4      |  | Inicia la comunicación por puerto serie con el equipo. |
| 5      |  | Habilita el uso del panel de control y el terminal. |
| 6      | Va al panel de control y selecciona la pestaña de "jog". |  |
| 7      | Indica la coordenada (absoluta) a la que debe desplazarse el cabezal. |  |
| 8      | Presiona "Mover". |  |
| 9      |  | Deshabilita los controles, muestra un ícono de carga y envía al servidor la solicitud. |
| 10     |  | Recibe el comando generado de GRBL y lo escribe en el terminal. |
| 11     |  | Recibe del servidor el resultado de ejecución del comando. |
| 12     |  | Actualiza las coordenadas del cabezal en el monitor de estado, muestra la respuesta del dispositivo en el terminal y habilita los controles. |

---

| **Sub-caso de uso**      | **Enviar comando** |
| :---        | :---        |
| **Identificador**      | UC10c |
| **Actores**      | Administrador |
| **Precondición**   | -- |
| **Resultado**   | El usuario puede enviar un comando (GRBL o Gcode) de forma manual. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda enviar un comando (de GRBL o Gcode) manualmente.

**Curso normal (básico):**

| **N**      | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---        | :---        | :---        |
| 1      | En el menú principal, selecciona la opción de "Control manual y calibración". |  |
| 2      | Selecciona el puerto serie del equipo y presiona "Conectar". |  |
| 3      |  | Inicia un canal de comunicación bidireccional con el servidor. |
| 4      |  | Inicia la comunicación por puerto serie con el equipo. |
| 5      |  | Habilita el uso del panel de control y el terminal. |
| 6      | Se dirije a la entrada de texto del terminal. |  |
| 7      | Ingresa un a línea de código G (o comando de GRBL) y presiona la tecla Enter. |  |
| 8      |  | Deshabilita los controles, muestra un ícono de carga, escribe el comando en el terminal y envía al servidor la solicitud. |
| 9      |  | Recibe del servidor el resultado de ejecución del comando. |
| 10     |  | Actualiza las coordenadas del cabezal en el monitor de estado, muestra la respuesta del dispositivo en el terminal y habilita los controles. |
