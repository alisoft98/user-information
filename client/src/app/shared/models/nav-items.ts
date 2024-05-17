export interface NavItem {
    id: number;
    title: string;
    url: string;
    icon?: string;
    parent_id: number;
    route?: string;
    path: string;
    role: Role[]
    order_index: number;
    created_at: Date;
    updated_at: Date;
    subMenu: Submneu[] | null;
  
  }
  export interface Role {
    user_id: number;
    role: string
  }
  
  export interface Submneu {
    id?: number;
    name: string;
    parent_id: number;
    url: string;
    permission: string;
  }