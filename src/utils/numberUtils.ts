export const isNumber = (x: unknown) => !isNaN(Number(x));

export const remap = (sourceFrom: number, sourceTo: number, targetFrom: number, targetTo: number, value: number) => targetFrom + (value - sourceFrom) * (targetTo - targetFrom) / (sourceTo - sourceFrom);
