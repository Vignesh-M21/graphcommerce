import { findPlugins } from '../../src/interceptors/findPlugins'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it.only('finds plugins', () => {
  expect(findPlugins(projectRoot)).toMatchInlineSnapshot(`
    Array [
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "@graphcommerce/magento-payment-paypal/plugins/AddPaypalMethods",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods",
      },
    ]
  `)
})
