import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "ads_tag": {
      "value": "",
      "schema": {
         "label": "Tag Google AdWords",
         "tooltip": "Tag ADS. Ex.: AW-77777777777",
         "placeholder": "AW-77777777777",
         "type": "text"
      }
   },
   "account_name": {
      "value": "",
      "schema": {
         "label": "Nome da conta do Google Analytics",
         "tooltip": "O nome da conta (URL do produto sem o protocolo HTTPS)",
         "placeholder": "heitorschleder.kebook.com.br/curso/guia-pratico-de-como-utilizar-o-kronus",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "_$fb": {
         "pages": {
            "main_page": "main_page"
         }
      },
      "ads_tag": "",
      "account_name": ""
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "select_account"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "create_ads_tag"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "publish"
         }
      ],
      "select_account": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://tagmanager.google.com/#/home"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//a[contains(@class, \"wd-container-name\") and contains(text(), \"@@account_name@\")]"
         }
      ],
      "create_ads_tag": [
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//a[contains(@href, '/variables')]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": false
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"ctrl.openCreateSheet()\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value('//div[@name=\"variable.data.name\"]', 'ads_auto_var', 'innerText')"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//gtm-empty-placeholder[@data-icon=\"gtm-variable-icon\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[text()='Permanente']"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//input[@data-ng-model=\"ctrl.value\"]",
            "value": "@@ads_tag@"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "x('//button[@data-gtm-submit-button]').click()"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//a[contains(@href, '/tags')]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"ctrl.openCreateSheet()\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//div[@class=\"gtm-veditor-section-overlay wd-veditor-section-overlay\"])[1]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//td[contains(text(), ' Google Ads ')]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[@ng-bind-html=\"::type.displayName\" and contains(text(), \"Tag do Google\")]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//div[contains(@class, \"gtm-text-addon\")]/input",
            "value": "{{ads_auto_var}}"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//div[@class=\"gtm-veditor-section-overlay wd-veditor-section-overlay\"])[2]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//div[text()='All Pages']"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value('//div[@data-ng-model=\"ctrl.tag.data.name\"]', 'ads_auto_tag', 'innerText')"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@type=\"submit\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         }
      ],
      "publish": [
         {
            "command": "click",
            "enabled": true,
            "target": "//button[@data-ng-click=\"ctrl.submit()\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[contains(text(), ' Publicar ')]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "2000"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[contains(text(), 'Continuar')]"
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

export const GoogleAdWordsGTMBlock: BlockProps = {
    title: 'Google - Adicionar Tag AdWords ao GTM',
    block_id: '86871799-bffe-4321-bceb-330df0ed1b00',
    description: 'Adiciona a tag do Google AdWords em uma conta GTM.',
    dependencies: ['a909454b-187e-4296-95ec-1effbe42d7af'],
    tags: ["google"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}