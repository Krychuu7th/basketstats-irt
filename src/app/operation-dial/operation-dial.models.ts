export type DialOperations = {
    icon: string;
    operation(...params: any[]): any;
    customClass?: string;
    tooltipMessage?: string;
}