import { isUserInAnyRole, isUserInEveryRole, isUserInRole } from './security.functions';

describe('isUserInRole', () => {
  const currentUserRoles = ['admin', 'user', 'superAdmin'];

  it('should return false if the user has no roles and the empty role is given', () => {
    const isInRole = isUserInRole([], '');
    expect(isInRole).toEqual(false);
  });

  it('should return false if the user has no roles and a role is given', () => {
    const isInRole = isUserInRole([], 'testRole');
    expect(isInRole).toEqual(false);
  });

  it('should return true if the user is in any of the given roles', () => {
    currentUserRoles.forEach(x => expect(isUserInRole(currentUserRoles, x)).toEqual(true));
  });

  it('should return true even if we add spaces before and after the test role if they are the same', () => {
    currentUserRoles.forEach(x => expect(isUserInRole(currentUserRoles, `     ${x}   `)).toEqual(true));
  });

  it('should return true even if we add spaces to the currentUserRoles if they are the same', () => {
    currentUserRoles.map(x => `     ${x}        `)
      .forEach((x, i, arr) =>
        expect(isUserInRole(arr, x)).toEqual(true));
  });

  it('should return false if the currentUserRolesArray contains the empty string and the control role is the empty string', () => {
    const roles = ['', 'role1', 'role2'];
    const isInRole = isUserInRole(roles, '');
    expect(isInRole).toEqual(false);
  });
});

describe('isUserInAnyRole', () => {
  it('should cross validate 2 string arrays while sanitizing them', () => {
    const currentUserRoles = ['', '   role1   ', '           role2', 'role3      ', '   role4'];
    const testRoles = ['', 'role1', 'role2             '];
    expect(isUserInAnyRole(currentUserRoles, testRoles)).toEqual(true);
  });

  it('should return false if the currentUserRoles arr is empty', () => {
    const currentUserRoles: string[] = [];
    const testRoles = ['r1', 'r2', 'r3'];
    expect(isUserInAnyRole(currentUserRoles, testRoles)).toEqual(false);
  });

  it('should return false if both arrays contain only the empty string or only roles with spaces', () => {
    const currentUserRoles = ['', '      ', '                      '];
    const testRoles = ['', '  ', '                  '];
    expect(isUserInAnyRole(currentUserRoles, testRoles)).toEqual(false);
  });

  it('should return true if at least 1 role matches', () => {
    const currentUserRoles = ['role1', 'role2', 'role3'];
    const testRoles = ['role1', 'role4', 'role5'];
    expect(isUserInAnyRole(currentUserRoles, testRoles)).toEqual(true);
  });

});

describe('isUserInEveryRole', () => {

  it('should return true if the controlRoles array is empty', () => {
    const result = isUserInEveryRole([], []);
    expect(result).toEqual(true);
  });

  it('should return false if the currentUserRoles array is empty and the control ones are not', () => {
    const result = isUserInEveryRole([], ['r1', 'r2', 'r3']);
    expect(result).toEqual(false);
  });


  it('should cross validate 2 string arrays while sanitizing them', () => {
    const currentUserRoles = ['', '   role1   ', '           role2', 'role3      ', '   role4'];
    const testRoles = ['', 'role1', 'role2             '];
    expect(isUserInEveryRole(currentUserRoles, testRoles)).toEqual(true);
  });


  it('should return true if both arrays contain only the empty string or only roles with spaces', () => {
    const currentUserRoles = ['', '      ', '                      '];
    const testRoles = ['', '  ', '                  '];
    expect(isUserInEveryRole(currentUserRoles, testRoles)).toEqual(true);
  });

  it('should return true if every role matches', () => {
    const currentUserRoles = ['role1', 'role2', 'role3', 'role4', 'role5'];
    const testRoles = ['role1', 'role4', 'role5'];
    expect(isUserInEveryRole(currentUserRoles, testRoles)).toEqual(true);
  });
});
