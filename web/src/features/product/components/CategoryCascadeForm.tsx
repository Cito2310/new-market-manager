import { SECTIONS } from "../../../../../shared/types";
import { ComboBoxForm } from "../../../shared/components/ComboBoxForm";
import { SelectForm } from "../../../shared/components/SelectForm";
import type { useCategoryCascade } from "../hooks/useCategoryCascade";

type CategoryCascadeFormProps = {
    cascade: ReturnType<typeof useCategoryCascade>;
};

// Dependent Section -> Category -> Subcategory -> Brand selection with creatable
// options. Presentational: the cascade state comes from the parent (so the form
// that owns it can read the selection when saving).
export const CategoryCascadeForm = ({ cascade }: CategoryCascadeFormProps) => {
    const { section, selectSection, error, levels } = cascade;

    return (
        <div className="flex w-full flex-col gap-1.5">
            <div className="flex w-full gap-3">
                <SelectForm
                    label="Sección"
                    options={SECTIONS}
                    value={section}
                    onChange={(event) => selectSection(event.target.value)}
                    placeholder="Elegí una sección"
                    className="min-w-0 flex-1 capitalize"
                />

                {levels.map((level) => (
                    <ComboBoxForm
                        key={level.label}
                        {...level}
                        className="min-w-0 flex-1 capitalize"
                    />
                ))}
            </div>

            {error && <p className="ml-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};
