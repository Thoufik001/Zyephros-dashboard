import { ChevronDown } from "lucide-react";
import { roleProfile, roleProfileList } from "../config/roles.js";

export function ProfileMenu({ role }) {
  const activeProfile = roleProfile(role);

  return (
    <details className="clean-profile-switcher">
      <summary className="clean-profile" data-role-profile="true">
        <img src={activeProfile.avatar} alt="" aria-hidden="true" />
        <span>
          <strong>{activeProfile.name}</strong>
          <em>{activeProfile.label}</em>
        </span>
        <ChevronDown aria-hidden="true" size={15} />
      </summary>
      <div className="role-profile-menu" role="menu">
        {roleProfileList.map((profile) => (
          <a aria-checked={String(profile.id === activeProfile.id)} href={profile.href} key={profile.id} role="menuitemradio">
            <img src={profile.avatar} alt="" aria-hidden="true" />
            <span>
              <strong>{profile.name}</strong>
              <em>{profile.label}</em>
            </span>
          </a>
        ))}
      </div>
    </details>
  );
}
