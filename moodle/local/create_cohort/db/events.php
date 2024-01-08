<?php
defined('MOODLE_INTERNAL') || die();

$observers = array(
    array(
        'eventname' => 'core\event\user_updated',
        'callback' => 'local_create_cohort_observer::create_cohort',
    ),
    
);