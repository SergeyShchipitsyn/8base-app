export type Field = {
  name: string
  label: string
  type?: FieldType
  optional?: boolean
  placeholder?: string
};

export type ReducerAction = {
  name: string
  payload: string
};

export enum FieldType {
  INPUT = 'Input',
  SELECT = 'Select'
}
