import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "email_system": {
      "value": "live",
      "schema": {
         "label": "Sistema de E-mails",
         "tooltip": "emails.kebook.live ou emails.kebook.vip",
         "placeholder": "vip",
         "fields_type": "select",
         "options": [
            "vip",
            "live"
         ]
      }
   },
   "lists": {
      "template_schema": {
         "list_name": ""
      },
      "schema": {
         "label": "Listas",
         "tooltip": "O nome das listas à serem criadas",
         "fields_type": "array",
         "fields": {
            "list_name": {
               "schema": {
                  "label": "Nome da lista",
                  "placeholder": "CURSO DE CROQUI DE MODA",
                  "type": "text"
               }
            }
         }
      },
      "value": []
   },
   "brand_name": {
      "value": "",
      "schema": {
         "label": "Nome da marca",
         "tooltip": "Nome da marca dentro do sistema de e-mails (nomesobrenome.kebook.com.br)",
         "placeholder": "gedeonribeiro.kebook.com.br",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "_pages": {
         "main_page": "main_page"
      },
      "email_system": {
         "value": "live",
         "__options__": [
            "vip",
            "live"
         ]
      },
      "lists": [
         {
            "list_name": "LIST_001"
         },
         {
            "list_name": "LIST_002"
         }
      ],
      "brand_name": "gedeonribeiro.kebook.com.br"
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://emails.kebook.%email_system.value%/login"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "login"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "create_list",
            "env_var": "%lists%"
         }
      ],
      "login": [
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@id='email']",
            "value": "contato@kebook.com.br"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@name='password']",
            "value": "zMc%461CGlZf&DLLL7r*"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[contains(text(), 'Sign in')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         }
      ],
      "create_list": [
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@class='btn btn-white dropdown-toggle']"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//ul[@class=\"dropdown-menu\"])[2]//a[contains(text(), '%$env.brand_name%')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ brand_id: (new URLSearchParams(window.location.search)).get('i') })"
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "https://emails.kebook.%$env.email_system.value%/list?i=%$env.brand_id%"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@id='new-list-btn']"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@id='list_name']",
            "value": "%list_name%"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@type='submit'][contains(text(), 'Add')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env_query({ '%list_name%.list': (new URLSearchParams(window.location.search)).get('l') })"
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "https://emails.kebook.%$env.email_system.value%/list?i=%$env.brand_id%"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env_query({ '%list_name%.id': x('//td/a[text()=\"%list_name%\"]/parent::td/preceding-sibling::td/span[@class=\"label encrypted-list-id\"]').innerText })"
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

export const EmailsGenListsBlock = {
    title: 'EmailsGenLists',
    block_id: '9006d0ff-b62c-4d19-99e3-369d6ebebb23',
    description: 'Gera as listas de e-mails.',
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}