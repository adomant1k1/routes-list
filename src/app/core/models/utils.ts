export interface GridColumn {
    title: string;
    field: string;
    sortingField: string;
    width: string;
    isIpField?: boolean;
}

export interface SortedBy {
    fieldName: string;
    isAsc: boolean;
}

export interface SelectOption {
    label: string;
    value: any;
}

export interface HeaderItem {
    label: string;
    routerLink: string;
}
