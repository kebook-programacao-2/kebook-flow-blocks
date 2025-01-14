import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   course_home: {
      value: '',
      schema: {
         label: 'Página inicial dos módulos',
         tooltip: 'Área de edição dos módulos',
         placeholder: 'https://my.nutror.com/cursos/123456/editar/modulos',
         type: 'text'
      }
   },
   modules: {
      template_schema: { module_title: '', module_lessons: [] },
      schema: {
         label: 'Módulos',
         tooltip: 'Todos os módulos.',
         fields_type: 'array',
         fields: {
            module_title: {
               label: 'Módulo',
               tooltip: 'O título do módulo',
               placeholder: 'Módulo 1',
               type: 'text'
            },
            module_lessons: {
               template_schema: { lesson_title: '', lesson_link: '' },
               schema: {
                  label: 'Aulas',
                  tooltip: 'As aulas do módulo',
                  fields_type: 'array',
                  fields: {
                     lesson_title: {
                        label: 'Título da aula',
                        placeholder: 'Aula 01 - Como se comportar em público',
                        type: 'text'
                     },
                     lesson_description: {
                        label: 'Descrição da aula',
                        placeholder: 'Nesta aula...',
                        type: 'text'
                     },
                     lesson_link: {
                        label: 'Link da aula',
                        placeholder: 'https://www.youtube.com/watch?v=_hqMALWpHD0',
                        type: 'text'
                     }
                  }
               }
            }
         }
      },
      value: []
   }
}

const PAYLOAD: Payload = {
   "env": {
      "course_home": "",
      "modules": [
         {
            "module_title": "Módulo 1 - MOD 1",
            "module_lessons": [
               {
                  "lesson_title": "Aula 01",
                  "lesson_description": "Nesta aula...",
                  "lesson_link": "https://www.youtube.com/watch?v=05Xl9ze-5-s"
               },
               {
                  "lesson_title": "Aula 02",
                  "lesson_description": "Nesta aula...",
                  "lesson_link": "https://www.youtube.com/watch?v=LleeqCYYv80"
               }
            ]
         },
         {
            "module_title": "Módulo 2 - MOD 02",
            "module_lessons": [
               {
                  "lesson_title": "Aula 01",
                  "lesson_description": "",
                  "lesson_link": "https://www.youtube.com/watch?v=4ps-bDRZ6II"
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
            "expression": "env({ course_home: '@@$$env:course_home@'.match(/.*modulos/g)[0] })"
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
            "target": "@@$$env:course_home@"
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
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@id='module_title']",
            "value": "@@module_title@"
         },
         {
            "command": "keyboard_type",
            "enabled": false,
            "target": "//*/input[@id='module_days_locked']",
            "value": "@@module_days_locked@"
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
            "command": "user_click",
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
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/label[text()='Titulo']/following-sibling::div/input",
            "value": "@@lesson_title@"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ lesson_description: '@@lesson_description@' || '@@lesson_title@' })"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//textarea",
            "value": "@@lesson_description@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//ul//*[text()='Youtube / Vimeo']"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/label[text()='Url']/following-sibling::div/input",
            "value": "@@lesson_link@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/p[text()='Ativar DRM']/parent::span/preceding-sibling::span//input"
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
   config: {
      ws_endpoint: "",
      close_browser_on_finish: false,
      close_browser_on_cancel_request: false,
      headless: true
   }
}

export const NutrorYTVimeoCreateModulesAndLessonsBlock = {
   title: 'Nutror (YouTube e Vimeo) - Criar Módulos e Aulas',
   block_id: '4df6ee4c-f5be-4a65-ba86-3944e670ca2b',
   description: 'Cria módulos e aulas em um determinado curso. Necessita login. Aceita somente aulas do YouTube ou do Vimeo.',
   dependencies: ['5817351e-5c56-4059-a620-759145d938a5'],
   tags: ['eduzz'],
   payload: PAYLOAD,
   env_payload: ENV_PAYLOAD
}