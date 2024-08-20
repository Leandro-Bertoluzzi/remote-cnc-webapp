| **Caso de uso**   | **Depurar archivo**                                           |
| :---------------- | :------------------------------------------------------------ |
| **Identificador** | UC18                                                          |
| **Actores**       | Administrador                                                 |
| **Precondición**  | El usuario tiene seleccionado un archivo.                     |
| **Resultado**     | El usuario puede depurar manualmente el archivo seleccionado. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda depurar un archivo manualmente, ejecutando los comandos del mismo línea por línea mientras monitorea el avance.

**Curso normal (básico):**

| **N** | **Acción realizada por actor**                                                | **Acción realizada por el sistema**                                                                                                     |
| :---- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | En el menú principal, selecciona la opción de "Control manual y calibración". |                                                                                                                                         |
| 2     | Presiona la opción "Abrir" en la barra de tareas.                             |                                                                                                                                         |
| 3     |                                                                               | Abre una ventana de selección de archivo.                                                                                               |
| 4     | Selecciona el archivo a cargar.                                               |                                                                                                                                         |
| 5     |                                                                               | Muestra el contenido del archivo en el editor de código.                                                                                |
| 6     | (opcional) Agrega uno o varios "breakpoints" al código.                       |                                                                                                                                         |
| 7     | Selecciona el puerto serie del equipo y presiona "Conectar".                  |                                                                                                                                         |
| 8     |                                                                               | Inicia un canal de comunicación bidireccional con el servidor.                                                                          |
| 9     |                                                                               | Inicia la comunicación por puerto serie con el equipo.                                                                                  |
| 10    |                                                                               | Habilita el uso del panel de control y el terminal.                                                                                     |
| 11    | Presiona la opción "Ejecutar" en la barra de tareas.                          |                                                                                                                                         |
| 12    |                                                                               | Deshabilita los controles y comienza a enviar los comandos al servidor.                                                                 |
| 13    |                                                                               | **Mientras haya líneas en el archivo o se alcance breakpoint:**                                                                         |
| 13.1  |                                                                               | Escribe el comando en el terminal, lo envía al servidor para su ejecución y espera hasta recibir notificación de ejecución del comando. |
| 13.2  |                                                                               | Se actualizan las coordenadas del cabezal en el monitor de estado y se muestra la respuesta del dispositivo en el terminal.             |
| 14    |                                                                               | Habilita los controles.                                                                                                                 |

**Curso alternativo (comando inválido):**

| **N** | **Acción realizada por actor** | **Acción realizada por el sistema**                                                   |
| :---- | :----------------------------- | :------------------------------------------------------------------------------------ |
| 13.2a |                                | Se notifica que el comando a ejecutar es inválido.                                    |
| 13.2b |                                | Muestra una ventana emergente indicando que hubo un error.                            |
| 13.2c | Cierra la ventana              |                                                                                       |
| 13.2d |                                | Habilita los controles y señala en el archivo la línea en la que se produjo el error. |
