<?php
// This file is NOT a part of Moodle - http://moodle.org/
//
// This client for Moodle 2 is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//

/**
 * REST client for Moodle 2
 * Return JSON or XML format
 *
 * @authorr Jerome Mouneyrac
 */

/// SETUP - NEED TO BE CHANGED
$token = 'c11de58e1ed8b11240b8cfd24622f675';
$domainname = 'http://localhost';
$functionname = 'core_user_create_users';

// REST RETURNED VALUES FORMAT
$restformat = 'json'; //Also possible in Moodle 2.2 and later: 'json'
//Setting it to 'json' will fail all calls on earlier Moodle version

//////// moodle_user_create_users ////////

/// PARAMETERS - NEED TO BE CHANGED IF YOU CALL A DIFFERENT FUNCTION
$user1 = new stdClass();
$user1->username = 'testusername1';
$user1->password = 'Test_password1';
$user1->firstname = 'testfirstname1';
$user1->lastname = 'testlastname1';
$user1->email = 'testemail1@moodle.com';

$user2 = new stdClass();
$user2->username = 'testusername2';
$user2->password = 'Test_password2';
$user2->firstname = 'testfirstname2';
$user2->lastname = 'testlastname2';
$user2->email = 'testemail2@moodle.com';

$users = array($user1, $user2);
$params = array('users' => $users);

/// REST CALL
header('Content-Type: text/plain');
$serverurl = $domainname . '/webservice/rest/server.php' . '?wstoken=' . $token . '&wsfunction=' . $functionname;
require_once('./curl.php');
$curl = new curl;
//if rest format == 'xml', then we do not add the param for backward compatibility with Moodle < 2.2
$restformat = ($restformat == 'json') ? '&moodlewsrestformat=' . $restformat : '';
$resp = $curl->post($serverurl . $restformat, $params);

var_dump($resp);
