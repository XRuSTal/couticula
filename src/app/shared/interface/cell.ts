export interface ICell {
    x: number;
    y: number;
    deep: number;
    isWall: boolean;
    ways: string ; // debug only
    isClear: boolean; // убиты ли монстры   
    isTravel: boolean; // сработало ли событие
    existsBoss: boolean; // наличие босса
    mosterLevel1Count: number;
    mosterLevel2Count: number;
}