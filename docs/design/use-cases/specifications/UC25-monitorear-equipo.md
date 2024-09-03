| **Caso de uso**   | **Monitorear equipo**                                                        |
| :---------------- | :--------------------------------------------------------------------------- |
| **Identificador** | UC25                                                                         |
| **Actores**       | Administrador                                                                |
| **Precondición**  | --                                                                           |
| **Resultado**     | El usuario puede ver el estado actual del equipo y un registro de actividad. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda monitorear el equipo a través de un seguimiento de la posición de la herramienta y estado del controlador, vista de cámara y terminal de comandos.

**Curso normal (básico):**

| **N** | **Acción realizada por actor**                                              | **Acción realizada por el sistema**                         |
| :---- | :-------------------------------------------------------------------------- | :---------------------------------------------------------- |
| 1     | En el menú principal, selecciona la opción de "Control manual y monitoreo". |                                                             |
| 2     |                                                                             | Inicia el canal de comunicación del estado del controlador. |
| 3     |                                                                             | Inicia el canal de comunicación de comandos ejecutados.     |
| 4     |                                                                             | Muestra al usuario el estado del controlador.               |
| 5     |                                                                             | Muestra al usuario el listado de comandos en el terminal.   |
