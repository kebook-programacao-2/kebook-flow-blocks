import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "email": {
      "value": "",
      "schema": {
         "label": "Email",
         "tooltip": "Email tooltip",
         "placeholder": "Email placeholder",
         "type": "text"
      }
   },
   "password": {
      "value": "",
      "schema": {
         "label": "Password",
         "tooltip": "Password tooltip",
         "placeholder": "Password placeholder",
         "type": "text"
      }
   },
   "section": {
      "value": "",
      "schema": {
         "label": "Seção",
         "tooltip": "Seção à ser excluída",
         "placeholder": "Top Offer Section",
         "fields_type": "select",
         "options": [
            "Nave Section",
            "Course Header Section",
            "Btn Sell Section",
            "Teacher Section",
            "About Product Section",
            "Course Profile Section",
            "Btn Sell Section",
            "How Section",
            "Classes Section",
            "Bonus Section",
            "Btn Sell Section",
            "Course Check Section",
            "Course Benefits Section",
            "Btn Sell Section",
            "Platform Section",
            "Guarantee Section",
            "Combo Section",
            "Course Btn Combo Section",
            "Options Section",
            "Btn Sell Section",
            "FAQ Section",
            "Disclaimer Section",
            "Footer All Section",
            "Modal Privacy Section",
            "Modal Contract Section",
            "Meta Tag Section",
            "Jivo Section",
            "Pixels Section",
            "Whatsapp Section",
            "Closed Section",
            "Modal Thanks"
        ]
      }
   },
   "prods": {
      "template_schema": {
         "prod_id": ""
      },
      "schema": {
         "label": "Prods",
         "tooltip": "Prods tooltip",
         "fields_type": "array",
         "fields": {
            "prod_id": {
               "schema": {
                  "label": "Prod_id",
                  "tooltip": "Prod_id tooltip",
                  "placeholder": "Prod_id placeholder",
                  "type": "text"
               }
            }
         }
      },
      "value": []
   }
};

const PAYLOAD: Payload = {
   "env": {
      "email": "kebook.programacao.2@gmail.com",
      "password": "-uc]3j#)J{P*",
      "prods": [
         {
            "prod_id": "2181"
         },
         {
            "prod_id": "2193"
         },
         {
            "prod_id": "2169"
         }
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "admin_login"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "remove_top_offer_section",
            "env_var": "@@prods@"
         }
      ],
      "admin_login": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://kronus.kebook.com.br/admin/login"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='email']",
            "value": "@@email@"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type='password']",
            "value": "@@password@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@type='submit']"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "eval_expression",
            "enabled": false,
            "expression": "xxx('//div[@field='id']').map(el => el.innerText)"
         }
      ],
      "remove_top_offer_section": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://kronus.kebook.com.br/admin/content/products/@@prod_id@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/span[@class='title' and text()='Seções']"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "async_eval(6, 1000, (res) => { const removeBtn = x(\"//*/span[@class='collection' and text()='@@$$env:section@:']/parent::li//i[@data-icon='close']\"); if (removeBtn) { removeBtn.click() } })"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button//i[@data-icon='check'])[1]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "7000"
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

export const KronusRemoveSectionBlock = {
    title: 'Kronus - Remove Section',
    block_id: 'b063f31a-79a7-4195-814e-7147708b5254',
    description: 'Removes a section from multiple products.',
    dependencies: ['24b45134-d2be-48d1-a097-ab04224eebd9'],
    tags: ["kronus","dev"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}