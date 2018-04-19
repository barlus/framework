export class Theme {
    static generateThemeClass(prop:string) {
        return 'mdc-theme--' + prop + '-bg';
    }
}