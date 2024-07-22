import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AdminLayout user={auth.user}>
            <div className="bg-base-100">Hello world</div>
        </AdminLayout>
    );
}
