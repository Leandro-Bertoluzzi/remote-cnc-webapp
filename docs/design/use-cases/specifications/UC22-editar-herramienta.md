| **Caso de uso**   | **Editar herramienta**                                          |
| :---------------- | :-------------------------------------------------------------- |
| **Identificador** | UC22                                                            |
| **Actores**       | Administrador                                                   |
| **Precondición**  | --                                                              |
| **Resultado**     | El usuario puede editar una herramienta/cabezal en el registro. |

**Resumen:**
Este caso de uso describe los pasos necesarios para que un administrador pueda editar la información de una de las herramientas en el registro.

**Curso normal (básico):**

| **N** | **Acción realizada por actor**                                                  | **Acción realizada por el sistema**                       |
| :---- | :------------------------------------------------------------------------------ | :-------------------------------------------------------- |
| 1     | En la vista de "Inventario", selecciona una herramienta.                        |                                                           |
| 2     | Cliquea el botón "Editar".                                                      |                                                           |
| 3     |                                                                                 | Despliega un formulario.                                  |
| 4     | Completa con la información actualizada de la herramienta y presiona "Aceptar". |                                                           |
| 5     |                                                                                 | Notifica al servidor y muestra una notificación de éxito. |

**Curso alternativo (el usuario se retracta):**

| **N** | **Acción realizada por actor** | **Acción realizada por el sistema** |
| :---- | :----------------------------- | :---------------------------------- |
| 4a    | Presiona "Cancelar".           |                                     |
| 4b    |                                | Cierra el formulario de edición.    |
