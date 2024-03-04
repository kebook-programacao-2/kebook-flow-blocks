
import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "expert_username": {
		"schema": {
			"label": "Nome de usuário",
			"tooltip": "Nome do usuário do expert, no canto superior esquerdo",
			"placeholder": "Dev da Silva",
			"type": "text"
		},
		"value": ""
	}
};

const PAYLOAD: Payload = {
   "env": {
      "expert_username": "Dev da Silva",
      "_email": "dev@kebook.com.br",
      "_password": "KZ5Zw=Hy5n+&RnR",
      "_kiwify_device_token": "YGVn23enZ1z0CjwS2NaX84lJZxKURo1qJalkPUuHituRydlSdktAoLVmrU6CWcLabDZ4Gf2c4f4inlFt2tYAX5TMUFmJVuY4Az0j",
      "_pages": {
         "main_page": "main_page",
         "titan": "Titan Page"
      },
      "_titan": {
         "email": "dev@kebook.com.br",
         "password": "3r59Jr&eq9*2zeTx7emu"
      }
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "login"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "select_user"
         },
         {
            "command": "run_flow",
            "enabled": false,
            "flow": "get_2fa_code"
         }
      ],
      "login": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://dashboard.kiwify.com.br/"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "localStorage.setItem('kiwi_device_token_8egvUrhQjiRsxuLSXUdWXhPUBJB3', '%_kiwify_device_token%');"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@name='email']",
            "value": "%_email%"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@name='password']",
            "value": "%_password%"
         },
         {
            "command": "user_click",
            "enabled": true,
            "target": "//*/button[contains(text(), 'Entrar')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         }
      ],
      "select_user": [
         {
            "command": "click",
            "enabled": true,
            "target": "//*/div[contains(@class, 'hidden sticky')]//a[contains(@href, '/?team=')]//*[contains(text(), '%expert_username%')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "screenshot",
            "enabled": false,
            "filename": "kiwify.png"
         }
      ],
      "get_2fa_code": [
         {
            "command": "new_page",
            "enabled": true,
            "page_id": "%_pages.titan%"
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "https://titan.hostgator.com.br/mail/"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@name=\"email\"]",
            "value": "%_titan.email%"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@name=\"password\"]",
            "value": "%_titan.password%"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[@data-testid=\"login-button\"]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "async_eval(12, 5000, (res) => {    const lastEmailTimestampXPath = '(//*/div[contains(@class, \\\"list-tabular-item unread\\\")])[1]//span[contains(@class, \\\"timestamp \\\")]';    const lastEmailXPath = '(//*/div[contains(@class, \\\"list-tabular-item unread\\\")])[1]//div[@class=\\\"subject\\\"]/div[contains(text(), \\\"Código de verificação\\\")]';         if (x(lastEmailXPath)) {        if (x(lastEmailTimestampXPath).innerText.match(/^[A-z]*/g)[0].length === 0) {           const lastEmailTimestamp_12h = x(lastEmailTimestampXPath).innerText.split(/(\\d*:?\\d*)(\\w*)/gi).filter(v => v).join(' ').toUpperCase();           const lastEmailTimestamp_24h = new Date('01/01/2024 ' + lastEmailTimestamp_12h).toLocaleTimeString('pt-BR', { timeStyle: 'short' });          console.log(lastEmailTimestamp_24h);                     const currentTimestamp = new Date().toLocaleTimeString('pt-BR', { timeStyle: 'short' });           const rawTimeDiff = Math.floor((new Date(`01/01/2024 ${currentTimestamp}`) - new Date(`01/01/2024 ${lastEmailTimestamp_24h}`)) / 60);           console.log(rawTimeDiff);                     if (rawTimeDiff < 15000) {              res({ kiwify_code: x(lastEmailXPath).innerText.match(/\\d/g).join(''), _expose_key: \"eval_kiwify\" })           }        } else {           console.log('E-mail muito antigo.', x(lastEmailTimestampXPath));           return 'E-mail muito antigo.'; }     } else {        console.log('Último e-mail não é da Kiwify ou já foi aberto.', x(lastEmailXPath));        return 'Último e-mail não é da Kiwify ou já foi aberto.';     }  })"
         },
         {
            "command": "branch_eval",
            "enabled": true,
            "expression": "eval_kiwify.kiwify_code && true",
            "success_flow": "code_found",
            "error_flow": "no_code_found"
         }
      ],
      "code_found": [
         {
            "command": "select_page",
            "enabled": true,
            "page_id": "%_pages.main_page%"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/input[@type=\"tel\"]",
            "value": "%$$res.kiwify_code%",
            "trigger_onchange_on_tab": true
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/button[contains(text(), 'Verificar')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         }
      ],
      "no_code_found": [
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "(() => ({ error: 'No code found :(' }))()"
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

export const KiwifyLoginBlock = {
    title: 'Kiwify - Login',
    block_id: '258e3800-5d46-455f-b20a-2ebb6743cedb',
    description: 'Faz login na Kiwify (com 2FA).',
    tags: ['kiwify'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}