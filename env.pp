file { '/var/lib/hiera/':
  ensure => 'directory',
}

file { '/var/lib/hiera/common.yaml': }

class { 'accounts':
  ssh_keys   => hiera_hash('accounts::ssh_keys', {}),
  users      => hiera_hash('accounts::users', {}),
  usergroups => hiera_hash('accounts::usergroups', {}),
}

include ssh

accounts::account { 'solidity':
  authorized_keys => [ 'solidity' ],
}


