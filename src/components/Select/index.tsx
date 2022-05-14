import { useField } from "formik";
import ReactSelect, { OnChangeValue } from "react-select";
import type { Props, GroupBase } from "react-select";
import type { SetRequired } from "type-fest";

type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = SetRequired<Props<Option, IsMulti, Group>, "name">;

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const [, , { setValue }] = useField<OnChangeValue<Option, IsMulti>>(
    props.name
  );

  return (
    <ReactSelect
      {...props}
      onChange={(value) => setValue(value)}
      theme={(theme) => ({ ...theme, borderRadius: 0 })}
    />
  );
};
