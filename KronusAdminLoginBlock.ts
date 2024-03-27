import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

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
   }
};

const PAYLOAD: Payload = {
   "env": {
      "email": "kebook.programacao.2@gmail.com",
      "password": "2@!ZhZ4py6DV"
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "admin_login"
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

export const KronusAdminLoginBlock: BlockProps = {
    title: 'Kronus - Admin Login',
    block_id: '24b45134-d2be-48d1-a097-ab04224eebd9',
    description: 'Kronus admin login.',
    dependencies: [],
    tags: ["kronus","dev"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}