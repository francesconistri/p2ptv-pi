# p2ptv-pi
P2P TV (Sopcast & AceStream) for Raspberry Pi.

Sopcast Client based on [this Sopcast client for Linux](https://code.google.com/p/sopcast-player/downloads/list) and `qemu-i386`. Thanks to [tayoken](http://www.raspberrypi.org/phpBB3/memberlist.php?mode=viewprofile&u=72614) for recompiling qemu-i386 and [sharing it](http://www.raspberrypi.org/phpBB3/viewtopic.php?t=46342).

AceStream Client is taken from [Github repository](https://github.com/tarasian666/acestream).

## Script usage

```bash
./tv.sh [OPTIONS] CHANNEL
```

## Options
- **-h** - help
- **-V** - show version
- **-v** - Enable debug mode
- **CHANNEL** - A uri to the channel to load: `sop://broker.sopcast.com:3912/123456` or `acestream://ff6d068d982f5ac218d164cf43f97dc39926cf55` or `http://example.com/tv.acelive`

## Requirements
- open port 6878 on localhost.
- wget and w3m: `sudo apt-get install wget w3m`
