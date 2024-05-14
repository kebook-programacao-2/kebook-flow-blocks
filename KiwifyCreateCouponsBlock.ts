import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

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
   "coupons": {
      "template_schema": {
         "name": "",
         "discount": ""
      },
      "schema": {
         "label": "Cupons",
         "tooltip": "Os cupons à serem criados",
         "fields_type": "array",
         "fields": {
            "name": {
               "schema": {
                  "label": "Código",
                  "tooltip": "Código do cupom",
                  "placeholder": "OFERTAEXCLUSIVA",
                  "type": "text"
               }
            },
            "discount": {
               "schema": {
                  "label": "Desconto",
                  "tooltip": "Desconto do cupom",
                  "placeholder": "40",
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
      "product_id": "400b6df0-bf6f-11ee-bf90-efa112225210",
      "coupons": [
         {
            "name": "OFERTAEXCLUSIVA",
            "discount": "40"
         }
      ]
   },
   "flows": {
      "main_flow": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://dashboard.kiwify.com.br/products/edit/@@product_id@?tab=settings"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "if (x(`//input[@id=\"product-section__coupons__toggle\" and contains(@class, \"bg-gray-200\")]`)) { x(`//input[@id=\"product-section__coupons__toggle\" and contains(@class, \"bg-gray-200\")]`).click() }"
         },
         {
            "command": "wait_for_dom_render",
            "enabled": true,
            "time": ""
         },
         {
            "command": "run_flow_for_each",
            "enabled": true,
            "flow": "create_coupon",
            "env_var": "@@coupons@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//button[contains(text(), \"Salvar produto\")]"
         }
      ],
      "create_coupon": [
         {
            "command": "click",
            "enabled": true,
            "target": "//button[contains(text(), \"cupom\")]"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//input[@id=\"coupon_code\"]",
            "value": "@@name@"
         },
         {
            "command": "keyboard_type",
            "enabled": true,
            "target": "//input[@id=\"discount_percentage\"]",
            "value": "@@discount@"
         },
         {
            "command": "user_click",
            "enabled": true,
            "target": "//label[@for=\"offers_list\"]//following-sibling::div"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//li[@name=\"Preço padrão\"]"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "(//div[@role=\"dialog\"]//button[contains(text(), \"Adicionar\")])[4]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "1000"
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

export const KiwifyCreateCouponsBlock: BlockProps = {
    title: 'Kiwify - Criar cupons',
    block_id: '4e86c0c3-2daf-4c65-8acd-669aa7ca03b9',
    description: 'Cria múltiplos cupons da Kiwify para um parceiro.',
    dependencies: ['258e3800-5d46-455f-b20a-2ebb6743cedb'],
    tags: ["kiwify"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}