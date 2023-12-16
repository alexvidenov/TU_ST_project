<?php
defined('MOODLE_INTERNAL') || die();

$observers = array(
    array(
        'eventname' => 'core\event\user_created',
        'callback' => 'local_remote_sync_observer::remote_sync',
    ),
    
);