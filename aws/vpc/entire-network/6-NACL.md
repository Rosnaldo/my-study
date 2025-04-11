
#### test NACL ####
- add rule to default NACL
  - HTTP, port 80, deny (sort rule to be above)
  (should block <BastionHost_public_ip>)
  - deny all outbound traffic
  (should block <BastionHost_public_ip>)

  - undo all NACL rules (so it does not effect next steps)
#### test ####
