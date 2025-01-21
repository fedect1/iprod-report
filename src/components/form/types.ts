export interface FormErrors {
    [key: string]: string | undefined;
  }
  
  export enum AddDealRoutes {
    ORDER_INFO = '/order-managment/create-order/step-1',
    RECIPE_DETAILS = '/order-managment/create-order/step-2',
    REVIEW_DEAL = '/order-managment/create-order/review',
  }