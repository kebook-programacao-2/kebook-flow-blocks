import type { EnvPayloadModel, Payload, BlockProps } from "$lib/types";

const ENV_PAYLOAD: EnvPayloadModel = {
   "id": {
      "value": "",
      "schema": {
         "label": "Product ID",
         "tooltip": "Id tooltip",
         "placeholder": "Id placeholder",
         "type": "text"
      }
   },
   "in_cash_price": {
      "value": "",
      "schema": {
         "label": "In cash price",
         "tooltip": "In_cash_price tooltip",
         "placeholder": "In_cash_price placeholder",
         "type": "text"
      }
   },
   "one_installment_price": {
      "value": "",
      "schema": {
         "label": "One installment price",
         "tooltip": "One_installment_price tooltip",
         "placeholder": "One_installment_price placeholder",
         "type": "text"
      }
   },
   "installments_number": {
      "value": "",
      "schema": {
         "label": "Installments number",
         "placeholder": "12",
         "type": "text"
      }
   },
   "comission_amount": {
      "value": "",
      "schema": {
         "label": "Comission amount",
         "tooltip": "Comission_amount tooltip",
         "placeholder": "Comission_amount placeholder",
         "type": "text"
      }
   }
};

const PAYLOAD: Payload = {
   "env": {
      "id": "2530",
      "in_cash_price": 738.17,
      "one_installment_price": 73.82,
      "installments_number": 12,
      "comission_amount": 0.4
   },
   "flows": {
      "main_flow": [
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "update_price"
         },
         {
            "command": "run_flow",
            "enabled": true,
            "flow": "save_product"
         }
      ],
      "update_price": [
         {
            "command": "goto",
            "enabled": true,
            "target": "https://kronus.kebook.com.br/admin/content/products/@@id@"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/span[@class=\"title\" and text()=\"Plataforma\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@scoped:comission_price': Math.round((( (@@in_cash_price@ * @@comission_amount@) * 100).toFixed(2))) / 100 })"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "env({ '@scoped:installments_price': Math.round((( (@@one_installment_price@ * @@installments_number@) * 100).toFixed(2))) / 100 })"
         },
         {
            "command": "click",
            "enabled": true,
            "target": "//*/span[@class=\"title\" and text()=\"Preço\"]"
         },
         {
            "command": "wait_seconds",
            "enabled": true,
            "time": "3000"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value(`//input[@collection=\"products\" and @field=\"inCashPrice\"]`, @@in_cash_price@)"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value(`//input[@collection=\"products\" and @field=\"installmentPrice\"]`, @@installments_price@)"
         },
         {
            "command": "eval_expression",
            "enabled": true,
            "expression": "set_element_value(`//input[@collection=\"products\" and @field=\"comissionPrice\"]`, @@comission_price@)"
         }
      ],
      "save_product": [
         {
            "command": "click",
            "enabled": true,
            "target": "(//*/button//i[@data-icon=\"check\"])[1]"
         },
         {
            "command": "wait_for_navigation",
            "enabled": true
         },
         {
            "command": "goto",
            "enabled": true,
            "target": "https://kronus.kebook.com.br/admin/content/products/@@id@"
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

export const KronusUpdatePriceBlock: BlockProps = {
    title: 'Kronus Update Price',
    block_id: '515ae993-562a-4333-941a-7e7c26a3aea8',
    description: 'Updates the price from a product.',
    dependencies: ['24b45134-d2be-48d1-a097-ab04224eebd9'],
    tags: ["kronus","dev"],
    payload: PAYLOAD,
    env_payload: ENV_PAYLOAD
}