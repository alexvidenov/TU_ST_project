<?php

class local_remote_sync_observer
{
    public static function remote_sync(\core\event\user_loggedin $event)
    {
        $event_data = $event->get_data();
        var_dump($event_data);
        error_log("in observer");
        die();
    }
}
