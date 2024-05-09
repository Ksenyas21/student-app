import {Input} from "@/components/ui/input";
import "../../../styles/studentTable.scss";
import {Label} from "@/components/ui/label";

const TableFilters = () => {
    return (
        <div className="border border-gray-300 rounded-lg mb-4 p-3">
            <div className="flex justify-between items-center gap-3">
                <div className="w-1/2">
                    <Label htmlFor="search-filter"> Search </Label>
                    <Input
                        type="search"
                        id="search-filter"
                        placeholder="Search by name or IDNP"
                    />
                </div>
                <div className="w-1/4">
                    <Label htmlFor="from-filter"> Date From </Label>
                    <Input type="date" id="from-filter"/>
                </div>
                <div className="w-1/4">
                    <Label htmlFor="t0-filter"> Date To </Label>
                    <Input type="date" id="to-filter"/>
                </div>
            </div>
        </div>
    );
}
export default TableFilters;
