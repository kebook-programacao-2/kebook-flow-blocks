import type { EnvPayloadModel, Payload } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "product_id": {
		"schema": {
			"label": "ID do Produto",
			"tooltip": "O ID do produto, que pode ser encontrado na URL",
			"placeholder": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
			"type": "text"
		},
		"value": ""
	},
   "campaigns": {
      "template_schema": {
         "title": "",
         "url": ""
      },
      "schema": {
         "label": "Campaigns",
         "tooltip": "Campaigns tooltip",
         "fields_type": "array",
         "fields": {
            "title": {
               "schema": {
                  "label": "Title",
                  "tooltip": "Title tooltip",
                  "placeholder": "Title placeholder",
                  "type": "text"
               }
            },
            "url": {
               "schema": {
                  "label": "Url",
                  "tooltip": "Url tooltip",
                  "placeholder": "Url placeholder",
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
      "product_id": "",
      "campaigns": [
         {
            "title": "Página de Vendas Oficial",
            "url": "https://expert.kebook.com.br/curso/produto/"
         },
         {
            "title": "Página de Checkout Oficial",
            "url": "https://sun.eduzz.com/7777777"
         },
         {
            "title": "Facebook para aquecer o lead",
            "url": "https://facebook.com"
         },
         {
            "title": "Instagram  para aquecer o lead",
            "url": "https://instagram.com"
         },
         {
            "title": "YouTube  para aquecer o lead",
            "url": "https://youtube.com"
         },
         {
            "title": "Banner 160x600",
            "url": "https://kronus.kebook.com.br/assets/ID_DA_IMAGEM.png"
         },
         {
            "title": "Banner 250x250",
            "url": "https://kronus.kebook.com.br/assets/20cfb8c9-abf7-4f8c-a3fc-981e53739eed.png"
         },
         {
            "title": "Banner 300x250",
            "url": "https://kronus.kebook.com.br/assets/20cfb8c9-abf7-4f8c-a3fc-981e53739eed.png"
         },
         {
            "title": "Banner 336x280",
            "url": "https://kronus.kebook.com.br/assets/20cfb8c9-abf7-4f8c-a3fc-981e53739eed.png"
         },
         {
            "title": "Banner 468x60",
            "url": "https://kronus.kebook.com.br/assets/20cfb8c9-abf7-4f8c-a3fc-981e53739eed.png"
         },
         {
            "title": "Banner 728x90",
            "url": "https://kronus.kebook.com.br/assets/20cfb8c9-abf7-4f8c-a3fc-981e53739eed.png"
         },
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://dashboard.kiwify.com.br/products/edit/%product_id%?tab=links"
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "create_campaign",
            "env_var": "%campaigns%"
         }
      ],
      "create_campaign": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button[contains(text(), 'Adicionar link')])[2]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/label[text()='Nome do link']/parent::div/following-sibling::div//input",
            "value": "%title%"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//*/label[text()='URL de destino']/parent::div/following-sibling::div//input",
            "value": "%url%",
            "trigger_onchange_on_tab": true
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button[contains(text(), 'Adicionar link')])[1]"
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

export const KiwifyCreateCampaignsBlock = {
    title: 'Kiwify - Criar campanhas',
    block_id: 'bd4612ae-ca21-4f8d-909a-a737d0dd92af',
    description: 'Cria campanhas na Kiwify.',
    tags: ['kiwify'],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}