function sanitizeUserRoles(roles: string[]): string[] {
  return roles.map(x => x.trim()).filter(x => x);
}

/**
 * This function verifies if a user is in a given role.
 * It starts by trimming the roles removing all
 * whitespace from left and right then filtering
 * the given roles array for every falsy value,
 * practically removing the empty strings from the array
 * then verifies if it includes the given role after it trims it too
 * @param currentUserRoles
 * @param controlRole
 */
export function isUserInRole(currentUserRoles: string[], controlRole: string): boolean {
  return sanitizeUserRoles(currentUserRoles).includes(controlRole.trim());
}

/**
 * This function verifies if a user is in any of the given roles.
 * It starts by trimming the roles removing all
 * whitespace from left and right then filtering
 * the given roles array for every falsy value,
 * practically removing the empty strings from the array
 * Then it does the same to the currentUserRoles array and does a cross-matching
 * @param currentUserRoles
 * @param controlRoles
 */
export function isUserInAnyRole(currentUserRoles: string[], controlRoles: string[]): boolean {
  const sanitizedControlRoles = sanitizeUserRoles(controlRoles);
  return sanitizeUserRoles(currentUserRoles).some(x => sanitizedControlRoles.includes(x));
}

/**
 * This function verifies if a user is in ALL of the given roles.
 * It starts by trimming the roles removing all
 * whitespace from left and right then filtering
 * the given roles array for every falsy value,
 * practically removing the empty strings from the array
 * Then it does the same to the currentUserRoles array and does a cross-matching
 *
 * If the controlRoles array is empty, it will return true
 *
 * @param currentUserRoles
 * @param controlRoles
 */
export function isUserInEveryRole(currentUserRoles: string[], controlRoles: string[]): boolean {
  const sanitizedControlRoles = sanitizeUserRoles(controlRoles);
  const sanitizedCurrentUserRoles = sanitizeUserRoles(currentUserRoles);
  return sanitizedControlRoles.every(controlRole => sanitizedCurrentUserRoles.includes(controlRole));
}
