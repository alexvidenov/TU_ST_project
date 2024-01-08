<?php

class local_remote_sync_observer
{
    public static function remote_sync(\core\event\user_created $event)
    {
        //https://us-central1-moodle-tu-sync.cloudfunctions.net/api

        $curl= curl_init();

        curl_setopt($curl, CURLOPT_URL, 'https://us-central1-moodle-tu-sync.cloudfunctions.net/api/moodle/notify');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $data = curl_exec($curl);
        curl_close($curl);
    
        echo "<pre>";
        var_dump(json_decode($data));
        echo "<pre>";
    }
}
