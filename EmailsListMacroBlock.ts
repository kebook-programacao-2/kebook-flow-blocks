import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "email_system": {
      "value": "live",
      "schema": {
         "label": "Email_system",
         "tooltip": "Email_system tooltip",
         "placeholder": "Email_system",
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
         "label": "Lists",
         "tooltip": "Lists tooltip",
         "fields_type": "array",
         "fields": {
            "list_name": {
               "schema": {
                  "label": "List_name",
                  "tooltip": "List_name tooltip",
                  "placeholder": "List_name placeholder",
                  "type": "text"
               }
            }
         }
      },
      "value": []
   },
   "login_email": {
      "value": "",
      "schema": {
         "label": "Login_email",
         "tooltip": "Login_email tooltip",
         "placeholder": "Login_email placeholder",
         "type": "text"
      }
   },
   "login_password": {
      "value": "",
      "schema": {
         "label": "Login_password",
         "tooltip": "Login_password tooltip",
         "placeholder": "Login_password placeholder",
         "type": "text"
      }
   },
   "brand_name": {
      "value": "",
      "schema": {
         "label": "Brand_name",
         "tooltip": "Brand_name tooltip",
         "placeholder": "Brand_name placeholder",
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
      "login_email": "contato@kebook.com.br",
      "login_password": "zMc%461CGlZf&DLLL7r*",
      "brand_name": "gedeonribeiro.kebook.com.br"
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://emails.kebook.@@email_system.value@/login"
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
            "env_var": "@@lists@"
         }
      ],
      "login": [
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@id='email']",
            "value": "@@login_email@"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@name='password']",
            "value": "@@login_password@"
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
            "target": "(//ul[@class=\"dropdown-menu\"])[2]//a[contains(text(), '@@$$env:brand_name@')]"
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
            "target": "https://emails.kebook.@@$$env:email_system.value@/list?i=@@$$env:brand_id@"
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
            "value": "@@list_name@"
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
            "expression": "env({ 'list_id_@@list_name@': (new URLSearchParams(window.location.search)).get('l') })"
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "https://emails.kebook.@@$$env:email_system.value@/list?i=@@$$env:brand_id@"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ @@list_name@_id: x('//td/a[text()='@@list_name@']/parent::td/preceding-sibling::td/span[@class=\"label encrypted-list-id\"]').innerText })"
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

export const EmailsListMacroBlock = {
    title: 'EmailsListMacro',
    block_id: 'a5d9923e-e9fa-4384-84cb-c14b616d1d4d',
    description: 'A new Flow Block.',
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}