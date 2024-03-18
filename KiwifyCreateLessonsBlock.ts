import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "product_id": {
      "value": "",
      "schema": {
         "label": "ID do produto",
         "tooltip": "O ID do produto pode ser encontrado na URL",
         "placeholder": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
         "type": "text"
      }
   },
   "modules": {
      "template_schema": {
         "module_title": "",
         "module_lessons": ""
      },
      "schema": {
         "label": "Módulos",
         "fields_type": "array",
         "fields": {
            "module_title": {
               "schema": {
                  "label": "Título do módulo",
                  "placeholder": "Módulo 1 - M1",
                  "type": "text"
               }
            },
            "module_lessons": {
               "template_schema": {
                  "lesson_title": "",
                  "lesson_filename": ""
               },
               "schema": {
                  "label": "Aulas",
                  "tooltip": "As aulas do respectivo módulo.",
                  "fields_type": "array",
                  "fields": {
                     "lesson_title": {
                        "schema": {
                           "label": "Título da aula",
                           "placeholder": "Aula 01 - A1",
                           "type": "text"
                        }
                     },
                     "lesson_filename": {
                        "schema": {
                           "label": "Nome do arquivo",
                           "tooltip": "Nome do arquivo de vídeo hospedado na Kiwify",
                           "placeholder": "M01_A001 - Aula 001",
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
      "product_id": "02fc2ecb-e6b9-48b7-9fbd-f4447673ab17",
      "modules": [
         {
            "module_title": "Módulo 1",
            "module_lessons": [
               {
                  "lesson_title": "Aula 001",
                  "lesson_filename": "M01_A001 - Aula 001"
               },
               {
                  "lesson_title": "Aula 002",
                  "lesson_filename": "M01_A002 - Aula 002"
               }
            ]
         }
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://dashboard.kiwify.com.br/members-area/view/@@product_id@?tab=content"
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
            "command": "click",
            "enabled": true,
            "target": "(//*/button[contains(text(), 'Adicionar')])[2]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/label[text()='Nome do módulo']/following-sibling::div/input",
            "value": "@@module_title@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[contains(text(), 'Adicionar módulo')]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
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
            "command": "click",
            "enabled": true,
            "target": "(//*/button[@id=\"options-menu\"]/div[contains(@class, 'rounded-full')])[last()]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/div[@class=\"dropdown z-50\" and not(@style=\"display: none;\")]//*/div[@role=\"menuitem\"])[1]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/label[text()='Título']/following-sibling::div/input",
            "value": "@@lesson_title@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[contains(text(), 'Adicionar da biblioteca')]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "(//input[@placeholder=\"Buscar....\"])[2]",
            "value": "@@lesson_filename@"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "5000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "((//table)[3]//tr)[2]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/label[contains(text(), 'Duração do conteúdo')]/following-sibling::div//input)[1]"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "x(\"(//*/label[contains(text(), 'Duração do conteúdo')]/following-sibling::div//input)[2]\").value = \"\""
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "(//*/label[contains(text(), 'Duração do conteúdo')]/following-sibling::div//input)[2]",
            "value": "365"
         },
         {
            "command": "user_click",
            "enabled": true,
            "target": "//*/div[contains(text(), 'Criar e publicar')]"
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
      "headless": false
   }
};

export const KiwifyCreateLessonsBlock = {
    title: 'Kiwify (Integrado) - Criar Módulos e Aulas',
    block_id: '004cfa7b-942e-4eb3-a356-265206ac703a',
    description: 'Cria módulos e aulas hospedadas na Kiwify. Requer login.',
    dependencies: ['258e3800-5d46-455f-b20a-2ebb6743cedb'],
    tags: ['kiwify'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}