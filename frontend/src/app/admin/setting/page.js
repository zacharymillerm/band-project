"use client";

import { AdminDataBox, AdminDirectoryBox } from "@/components/Boxes";
import { AdminPageWrapper } from "@/pageComponent/admin/AdminSection";

const AdminSetting = () => {
  const content = (
    <div style={{ paddingBottom: "116px" }}>
      <AdminDataBox />
      <AdminDirectoryBox />
    </div>
  );

  return <AdminPageWrapper content={content} />;
};

export default AdminSetting;
