import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "product_id": {
      "value": "",
      "schema": {
         "label": "Product_id",
         "tooltip": "Product_id tooltip",
         "placeholder": "Product_id placeholder",
         "type": "text"
      }
   },
   "modules": {
      "template_schema": {
         "module_title": "",
         "module_lessons": ""
      },
      "schema": {
         "label": "Modules",
         "tooltip": "Modules tooltip",
         "fields_type": "array",
         "fields": {
            "module_title": {
               "schema": {
                  "label": "Module_title",
                  "tooltip": "Module_title tooltip",
                  "placeholder": "Module_title placeholder",
                  "type": "text"
               }
            },
            "module_lessons": {
               "template_schema": {
                  "lesson_title": "",
                  "content_title": "",
                  "content_link": "",
                  "content_cta": ""
               },
               "schema": {
                  "label": "Module_lessons",
                  "tooltip": "Module_lessons tooltip",
                  "fields_type": "array",
                  "fields": {
                     "lesson_title": {
                        "schema": {
                           "label": "Título da aula",
                           "placeholder": "Aula 01 - A1",
                           "type": "text"
                        }
                     },
                     "content_title": {
                        "schema": {
                           "label": "Título",
                           "tooltip": "Título do conteúdo",
                           "placeholder": "Material para download",
                           "type": "text"
                        }
                     },
                     "content_link": {
                        "schema": {
                           "label": "Link do material",
                           "tooltip": "Link do material para baixar",
                           "placeholder": "Content_link placeholder",
                           "type": "text"
                        }
                     },
                     "content_cta": {
                        "schema": {
                           "label": "Texto do botão",
                           "tooltip": "Texto do botão para baixar o material",
                           "placeholder": "https://drive.google.com/file",
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
                  "content_title": "Material para download - M001",
                  "content_link": "https://drive.google.com/file/001",
                  "content_cta": "Baixar material"
               },
               {
                  "lesson_title": "Aula 002",
                  "content_title": "Material para download - M002",
                  "content_link": "https://drive.google.com/file/002",
                  "content_cta": "Baixar material"
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
            "target": "//*/a[@data-re-name=\"html\"]"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "x(\"//*/textarea\").value = '<h3 style=\"text-align: center;\">@@content_title@</h3><h1 style=\"text-align: center;\"><a href=\"@@content_link@\" target=\"_blank\">@@content_cta@</a></h1>'"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/textarea",
            "value": " "
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

export const KiwifyMaterialDownloadCreateLessonsBlock = {
    title: 'Kiwify (Material download) - Criar Módulos e Aulas',
    block_id: '7849a4f9-203a-4dfa-bf9c-5e46c973d87c',
    description: 'Cria módulos e aulas para download de material. Requer login.',
    dependencies: ['258e3800-5d46-455f-b20a-2ebb6743cedb'],
    tags: ['kiwify'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}