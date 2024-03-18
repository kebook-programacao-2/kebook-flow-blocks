import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "course_home": {
      "value": "",
      "schema": {
         "label": "Página inicial dos módulos",
         "tooltip": "Área de edição dos módulos",
         "placeholder": "https://my.nutror.com/cursos/123456/editar/modulos",
         "type": "text"
      }
   },
   "modules": {
      "template_schema": {
         "module_title": "",
         "module_lessons": ""
      },
      "schema": {
         "label": 'Módulos',
         "tooltip": 'Todos os módulos.',
         "fields_type": "array",
         "fields": {
            "module_title": {
               "schema": {
                  "label": 'Módulo',
                  "tooltip": 'O título do módulo',
                  "placeholder": 'Módulo 1',
                  "type": "text"
               }
            },
            "module_lessons": {
               "template_schema": {
                  "lesson_title": "",
                  "video_title": ""
               },
               "schema": {
                  "label": 'Aulas',
                  "tooltip": 'As aulas do módulo',
                  "fields_type": "array",
                  "fields": {
                     "lesson_title": {
                        "schema": {
                           "label": 'Título da aula',
                           "placeholder": 'Aula 01 - Como se comportar em público',
                           "type": "text"
                        }
                     },
                     "video_title": {
                        "schema": {
                           "label": "Título do vídeo",
                           "tooltip": "Nome do arquivo de vídeo dentro do SafeVideo",
                           "placeholder": "_M1A4_COMO_SOBREVIVER_A_NOITE",
                           "type": "text"
                        }
                     }
                  }
               }
            }
         }
      },
      "value": []
   }
};

const PAYLOAD: Payload = {
   "env": {
      "course_home": "https://my.nutror.com/cursos/448530/editar/modulos",
      "modules": [
         {
            "module_title": "Módulo 07 - Touro",
            "module_lessons": [
               {
                  "lesson_title": "Aula 01 - Patas dianteiras e traseiras",
                  "video_title": "_M7_Aula 01 - Patas dianteiras e traseiras"
               },
               {
                  "lesson_title": "Aula 02 - Meio do corpo",
                  "video_title": "_M7_Aula 02 - Meio do corpo"
               }
            ]
         },
         {
            "module_title": "Módulo 08 - Vaca",
            "module_lessons": [
               {
                  "lesson_title": "Aula 01 - Patas dianteiras e traseiras",
                  "video_title": "_M8_Aula 01 - Patas dianteiras e traseiras"
               },
               {
                  "lesson_title": "Aula 02 - Meio do corpo",
                  "video_title": "_M8_Aula 02 - Meio do corpo"
               }
            ]
         }
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ course_home: '@@course_home@'.match(/.*modulos/g)[0] })"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "create_module",
            "env_var": "@@modules@"
         }
      ],
      "create_module": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@$$env:course_home@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button/span[text()='Adicionar módulos']"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@id='module_save']"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/h6[text()='@@module_title@']"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button/span[text()='Adicionar Aula'])[last()]"
         },
         {
            "command": "extract_route_from_url",
            "enabled": true,
            "regex": "(?<=/cursos/[0-9]*/editar/modulos/).*(?=/aula)",
            "response_slot": "module_id"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "create_lesson",
            "env_var": "@@module_lessons@"
         }
      ],
      "create_lesson": [
         {
            "command": "goto",
            "enabled": true,
            "target": "@@$$env:course_home@/@@$$res:module_id@/aula"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/h6[text()='Conteúdos']/following-sibling::ul//button[@type=\"button\"])[1]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button/span[contains(text(), 'Selecionar vídeo')]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "5000"
         },
         {
            "command": "attach_to_iframe",
            "enabled": true,
            "name": "https://launcher.safevideo.com"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "4000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div[contains(@style, 'background-image')]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[text()='Importar']"
         },
         {
            "command": "detach_from_iframe",
            "enabled": true
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/p[text()='Ativar Imprint']/parent::span/preceding-sibling::span//input"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button//*[text()='Salvar']"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         }
      ]
   },
   "config": {
      "ws_endpoint": "",
      "close_browser_on_finish": false,
      "close_browser_on_cancel_request": false,
      "headless": true
   }
};

export const NutrorSafeVideoCreateModulesAndLessonsBlock = {
    title: 'Nutror (SafeVideo) - Criar Módulos e Aulas',
    block_id: 'a21f1fa1-c78d-4d88-9213-dbbd56054739',
    description: 'Cria módulos e aulas em um determinado curso. Necessita login. Aceita somente aulas do SafeVideo.',
    dependencies: ['5817351e-5c56-4059-a620-759145d938a5'],
    tags: ['eduzz'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}