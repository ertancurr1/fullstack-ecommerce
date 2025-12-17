import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($products: [String!]!) {
    createOrder(products: $products)
  }
`;
